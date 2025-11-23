// Import model CV
const CV = require("../models/cv.model");

// Hàm lưu CV chính thức
exports.saveCV = async (req, res) => {
  try {
    // Lấy dữ liệu từ request body
    const { userId, title, objective, skills, template, cvData } = req.body;

    // In ra console để kiểm tra
    console.log("Nhận được dữ liệu:", {
      userId,
      title,
      hasSkills: !!skills,
      hasCvData: !!cvData,
    });

    // Kiểm tra userId có tồn tại không
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId là bắt buộc",
      });
    }
    
    // Kiểm tra title có tồn tại không
    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Tiêu đề CV là bắt buộc",
      });
    }

    // Gọi hàm lưu CV từ model
    const ketQua = await CV.saveCV({
      userId,
      title: title.trim(),
      objective: objective || "",
      skills: skills || [],
      template: template || "modern",
      cvData: cvData || {},
    });

    // Trả về kết quả thành công
    res.json({
      success: true,
      message: "Lưu CV thành công!",
      data: ketQua,
    });
  } catch (loi) {
    // Nếu có lỗi thì in ra console
    console.error("Lỗi lưu CV:", loi);
    console.error("Chi tiết lỗi:", {
      message: loi.message,
      stack: loi.stack,
      name: loi.name,
    });

    // Tạo thông báo lỗi
    let thongBaoLoi = "Lỗi khi lưu CV";
    if (loi.message) {
      thongBaoLoi = loi.message;
    } else if (loi.originalError && loi.originalError.message) {
      thongBaoLoi = loi.originalError.message;
    }

    // Trả về lỗi cho client
    res.status(500).json({
      success: false,
      message: thongBaoLoi,
      error: process.env.NODE_ENV === "development" ? loi.stack : undefined,
    });
  }
};

// Hàm lưu bản nháp
exports.saveDraft = async (req, res) => {
  try {
    // Lấy dữ liệu từ request
    const { userId, cvId, title, objective, skills, template, cvData } =
      req.body;

    // In ra console
    console.log("Nhận được dữ liệu bản nháp:", {
      userId,
      cvId,
      title,
      hasSkills: !!skills,
    });

    // Kiểm tra userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId là bắt buộc",
      });
    }

    // Gọi hàm lưu bản nháp
    const ketQua = await CV.saveDraft({
      userId,
      cvId,
      title: title || "CV chưa đặt tên",
      objective: objective || "",
      skills: skills || [],
      template: template || "modern",
      cvData: cvData || {},
    });

    // Trả về kết quả
    res.json({
      success: true,
      message: "Đã lưu bản nháp!",
      data: ketQua,
    });
  } catch (loi) {
    // In lỗi ra console
    console.error("Lỗi lưu bản nháp:", loi);
    console.error("Chi tiết lỗi:", {
      message: loi.message,
      stack: loi.stack,
      name: loi.name,
    });

    // Tạo thông báo lỗi
    let thongBaoLoi = "Lỗi khi lưu bản nháp";
    if (loi.message) {
      thongBaoLoi = loi.message;
    } else if (loi.originalError && loi.originalError.message) {
      thongBaoLoi = loi.originalError.message;
    }

    // Trả về lỗi
    res.status(500).json({
      success: false,
      message: thongBaoLoi,
      error: process.env.NODE_ENV === "development" ? loi.stack : undefined,
    });
  }
};

// Hàm lấy danh sách CV
exports.getCVs = async (req, res) => {
  try {
    // Lấy userId từ params
    const { userId } = req.params;
    const { includeDrafts } = req.query;

    // Kiểm tra userId
    if (!userId) {
      return res.status(400).json({ message: "UserId là bắt buộc" });
    }

    // Gọi hàm lấy danh sách CV
    const ketQua = await CV.getCVs(userId, includeDrafts === "true");

    // Parse JSON fields nếu cần
    const danhSachCV = ketQua.map((cv) => {
      const cvDaParse = { ...cv };
      // Skills đã được parse trong model rồi
      if (
        cv.CVData &&
        typeof cv.CVData === "string" &&
        cv.CVData.startsWith("{")
      ) {
        try {
          cvDaParse.CVData = JSON.parse(cv.CVData);
        } catch (loi) {
          cvDaParse.CVData = {};
        }
      }
      return cvDaParse;
    });

    // Trả về danh sách CV
    res.json({
      success: true,
      data: danhSachCV,
    });
  } catch (loi) {
    console.error("Lỗi lấy danh sách CV:", loi);
    res.status(500).json({
      success: false,
      message: loi.message || "Lỗi khi lấy danh sách CV",
    });
  }
};

// Hàm lấy CV theo ID
exports.getCVById = async (req, res) => {
  try {
    // Lấy id từ params và userId từ query
    const { id } = req.params;
    const { userId } = req.query;

    // Kiểm tra xem có đủ thông tin không
    if (!id || !userId) {
      return res.status(400).json({ message: "CVId và UserId là bắt buộc" });
    }

    // Gọi hàm lấy CV từ model
    const ketQua = await CV.getCVById(id, userId);

    // Kiểm tra xem có tìm thấy CV không
    if (!ketQua) {
      return res.status(404).json({ message: "Không tìm thấy CV" });
    }

    // Parse JSON fields nếu cần (Skills đã được parse trong model rồi)
    if (
      ketQua.CVData &&
      typeof ketQua.CVData === "string" &&
      ketQua.CVData.startsWith("{")
    ) {
      try {
        ketQua.CVData = JSON.parse(ketQua.CVData);
      } catch (loi) {
        ketQua.CVData = {};
      }
    }

    // Trả về CV
    res.json({
      success: true,
      data: ketQua,
    });
  } catch (loi) {
    console.error("Lỗi lấy CV:", loi);
    res.status(500).json({
      success: false,
      message: loi.message || "Lỗi khi lấy CV",
    });
  }
};

// Hàm cập nhật CV
exports.updateCV = async (req, res) => {
  try {
    // Lấy id từ params
    const { id } = req.params;
    // Lấy dữ liệu từ body
    const { userId, title, objective, skills, template, cvData } = req.body;

    // Kiểm tra thông tin bắt buộc
    if (!id || !userId) {
      return res.status(400).json({ message: "CVId và UserId là bắt buộc" });
    }
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Tiêu đề CV là bắt buộc" });
    }

    // Gọi hàm cập nhật CV
    const ketQua = await CV.updateCV(id, userId, {
      title: title.trim(),
      objective: objective || "",
      skills: skills || [],
      template: template || "modern",
      cvData: cvData || {},
    });

    // Kiểm tra xem có cập nhật được không
    if (!ketQua) {
      return res.status(404).json({ message: "Không tìm thấy CV để cập nhật" });
    }

    // Parse JSON fields nếu cần
    if (
      ketQua.CVData &&
      typeof ketQua.CVData === "string" &&
      ketQua.CVData.startsWith("{")
    ) {
      try {
        ketQua.CVData = JSON.parse(ketQua.CVData);
      } catch (loi) {
        ketQua.CVData = {};
      }
    }

    // Trả về kết quả
    res.json({
      success: true,
      message: "Cập nhật CV thành công!",
      data: ketQua,
    });
  } catch (loi) {
    console.error("Lỗi cập nhật CV:", loi);
    res.status(500).json({
      success: false,
      message: loi.message || "Lỗi khi cập nhật CV",
    });
  }
};

// Hàm xóa CV
exports.deleteCV = async (req, res) => {
  try {
    // Lấy id từ params và userId từ query
    const { id } = req.params;
    const { userId } = req.query;

    // Kiểm tra thông tin
    if (!id || !userId) {
      return res.status(400).json({ message: "CVId và UserId là bắt buộc" });
    }

    // Gọi hàm xóa CV
    const daXoa = await CV.deleteCV(id, userId);

    // Kiểm tra xem có xóa được không
    if (!daXoa) {
      return res.status(404).json({ message: "Không tìm thấy CV để xóa" });
    }

    // Trả về kết quả
    res.json({
      success: true,
      message: "Xóa CV thành công!",
    });
  } catch (loi) {
    console.error("Lỗi xóa CV:", loi);
    res.status(500).json({
      success: false,
      message: loi.message || "Lỗi khi xóa CV",
    });
  }
};

// Hàm tải CV dạng PDF
exports.downloadPDF = async (req, res) => {
  try {
    // Lấy id từ params và userId từ query
    const { id } = req.params;
    const { userId } = req.query;

    // Kiểm tra thông tin
    if (!id || !userId) {
      return res.status(400).json({ message: "CVId và UserId là bắt buộc" });
    }

    // Lấy thông tin CV
    const cv = await CV.getCVById(id, userId);

    // Kiểm tra xem có tìm thấy CV không
    if (!cv) {
      return res.status(404).json({ message: "Không tìm thấy CV" });
    }

    // Parse JSON fields nếu cần (Skills đã được parse trong model rồi)
    if (
      cv.CVData &&
      typeof cv.CVData === "string" &&
      cv.CVData.startsWith("{")
    ) {
      try {
        cv.CVData = JSON.parse(cv.CVData);
      } catch (loi) {
        cv.CVData = {};
      }
    }

    // Tạo PDF từ CV
    const pdfService = require("../services/pdf.service");
    const pdfBuffer = await pdfService.generatePDF(cv);

    // Tạo tên file
    const tenFile = `${cv.Title || "CV"}_${Date.now()}.pdf`;
    
    // Set headers để download file
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(tenFile)}"`
    );
    res.setHeader("Content-Length", pdfBuffer.length);

    // Gửi file PDF về client
    res.send(pdfBuffer);
  } catch (loi) {
    console.error("Lỗi tải PDF:", loi);
    res.status(500).json({
      success: false,
      message: loi.message || "Lỗi khi tải PDF",
    });
  }
};
