const CV = require("../models/cv.model");

// Lưu CV chính thức
exports.saveCV = async (req, res) => {
  try {
    const { userId, title, objective, skills, template, cvData } = req.body;

    console.log("Received data:", {
      userId,
      title,
      hasSkills: !!skills,
      hasCvData: !!cvData,
    });

    // Validation cơ bản
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId là bắt buộc",
      });
    }
    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Tiêu đề CV là bắt buộc",
      });
    }

    const result = await CV.saveCV({
      userId,
      title: title.trim(),
      objective: objective || "",
      skills: skills || [],
      template: template || "modern",
      cvData: cvData || {},
    });

    res.json({
      success: true,
      message: "Lưu CV thành công!",
      data: result,
    });
  } catch (e) {
    console.error("Lỗi lưu CV:", e);
    console.error("Error details:", {
      message: e.message,
      stack: e.stack,
      name: e.name,
    });

    // Kiểm tra lỗi cụ thể
    let errorMessage = "Lỗi khi lưu CV";
    if (e.message) {
      errorMessage = e.message;
    } else if (e.originalError && e.originalError.message) {
      errorMessage = e.originalError.message;
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === "development" ? e.stack : undefined,
    });
  }
};

// Lưu bản nháp
exports.saveDraft = async (req, res) => {
  try {
    const { userId, cvId, title, objective, skills, template, cvData } =
      req.body;

    console.log("Received draft data:", {
      userId,
      cvId,
      title,
      hasSkills: !!skills,
    });

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId là bắt buộc",
      });
    }

    const result = await CV.saveDraft({
      userId,
      cvId,
      title: title || "CV chưa đặt tên",
      objective: objective || "",
      skills: skills || [],
      template: template || "modern",
      cvData: cvData || {},
    });

    res.json({
      success: true,
      message: "Đã lưu bản nháp!",
      data: result,
    });
  } catch (e) {
    console.error("Lỗi lưu bản nháp:", e);
    console.error("Error details:", {
      message: e.message,
      stack: e.stack,
      name: e.name,
    });

    let errorMessage = "Lỗi khi lưu bản nháp";
    if (e.message) {
      errorMessage = e.message;
    } else if (e.originalError && e.originalError.message) {
      errorMessage = e.originalError.message;
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === "development" ? e.stack : undefined,
    });
  }
};

// Lấy danh sách CV
exports.getCVs = async (req, res) => {
  try {
    const { userId } = req.params;
    const { includeDrafts } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "UserId là bắt buộc" });
    }

    const result = await CV.getCVs(userId, includeDrafts === "true");

    // Parse JSON fields nếu cần
    const cvs = result.map((cv) => {
      const parsed = { ...cv };
      // Skills đã được parse trong model
      if (
        cv.CVData &&
        typeof cv.CVData === "string" &&
        cv.CVData.startsWith("{")
      ) {
        try {
          parsed.CVData = JSON.parse(cv.CVData);
        } catch (e) {
          parsed.CVData = {};
        }
      }
      return parsed;
    });

    res.json({
      success: true,
      data: cvs,
    });
  } catch (e) {
    console.error("Lỗi lấy danh sách CV:", e);
    res.status(500).json({
      success: false,
      message: e.message || "Lỗi khi lấy danh sách CV",
    });
  }
};

// Lấy CV theo ID
exports.getCVById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!id || !userId) {
      return res.status(400).json({ message: "CVId và UserId là bắt buộc" });
    }

    const result = await CV.getCVById(id, userId);

    if (!result) {
      return res.status(404).json({ message: "Không tìm thấy CV" });
    }

    // Parse JSON fields nếu cần (Skills đã được parse trong model)
    if (
      result.CVData &&
      typeof result.CVData === "string" &&
      result.CVData.startsWith("{")
    ) {
      try {
        result.CVData = JSON.parse(result.CVData);
      } catch (e) {
        result.CVData = {};
      }
    }

    res.json({
      success: true,
      data: result,
    });
  } catch (e) {
    console.error("Lỗi lấy CV:", e);
    res.status(500).json({
      success: false,
      message: e.message || "Lỗi khi lấy CV",
    });
  }
};

// Cập nhật CV
exports.updateCV = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, title, objective, skills, template, cvData } = req.body;

    if (!id || !userId) {
      return res.status(400).json({ message: "CVId và UserId là bắt buộc" });
    }
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Tiêu đề CV là bắt buộc" });
    }

    const result = await CV.updateCV(id, userId, {
      title: title.trim(),
      objective: objective || "",
      skills: skills || [],
      template: template || "modern",
      cvData: cvData || {},
    });

    if (!result) {
      return res.status(404).json({ message: "Không tìm thấy CV để cập nhật" });
    }

    // Parse JSON fields nếu cần
    if (
      result.CVData &&
      typeof result.CVData === "string" &&
      result.CVData.startsWith("{")
    ) {
      try {
        result.CVData = JSON.parse(result.CVData);
      } catch (e) {
        result.CVData = {};
      }
    }

    res.json({
      success: true,
      message: "Cập nhật CV thành công!",
      data: result,
    });
  } catch (e) {
    console.error("Lỗi cập nhật CV:", e);
    res.status(500).json({
      success: false,
      message: e.message || "Lỗi khi cập nhật CV",
    });
  }
};

// Xóa CV
exports.deleteCV = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!id || !userId) {
      return res.status(400).json({ message: "CVId và UserId là bắt buộc" });
    }

    const deleted = await CV.deleteCV(id, userId);

    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy CV để xóa" });
    }

    res.json({
      success: true,
      message: "Xóa CV thành công!",
    });
  } catch (e) {
    console.error("Lỗi xóa CV:", e);
    res.status(500).json({
      success: false,
      message: e.message || "Lỗi khi xóa CV",
    });
  }
};

// Tải CV dạng PDF
exports.downloadPDF = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!id || !userId) {
      return res.status(400).json({ message: "CVId và UserId là bắt buộc" });
    }

    const cv = await CV.getCVById(id, userId);

    if (!cv) {
      return res.status(404).json({ message: "Không tìm thấy CV" });
    }

    // Parse JSON fields nếu cần (Skills đã được parse trong model)
    if (
      cv.CVData &&
      typeof cv.CVData === "string" &&
      cv.CVData.startsWith("{")
    ) {
      try {
        cv.CVData = JSON.parse(cv.CVData);
      } catch (e) {
        cv.CVData = {};
      }
    }

    // Generate PDF
    const pdfService = require("../services/pdf.service");
    const pdfBuffer = await pdfService.generatePDF(cv);

    // Set headers để download file
    const fileName = `${cv.Title || "CV"}_${Date.now()}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(fileName)}"`
    );
    res.setHeader("Content-Length", pdfBuffer.length);

    res.send(pdfBuffer);
  } catch (e) {
    console.error("Lỗi tải PDF:", e);
    res.status(500).json({
      success: false,
      message: e.message || "Lỗi khi tải PDF",
    });
  }
};
