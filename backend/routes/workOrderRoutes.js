const multer = require("multer");
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const sendMail = require("../utils/sendMail");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ======================================================
// CREATE WORK ORDER
// ======================================================
router.post("/create", upload.single("work_order_file"), async (req, res) => {
  try {
    console.log("WORK ORDER BODY:", req.body);

    const {
      scheme_name,
      budget_head,
      approved_year,
      block_name,
      agreement_no,
      work_name,
      road_length,
      pan_no,
      package_no,
      vendor_name,
      work_order_name,
      work_order_number,
      work_order_start_date,
      completion_date,
      aa_cost,
      amount_put_to_tender,
      tendered_construction_amount,
      agreement_maintenance_amount,
      total_agreement_amount,
      accepted_rate,
      accepted_rate_percent,
      completion_period_months,
      approved_work_order_amount,
      paid_amount,
      remaining_amount,
      status,
      user_email,
    } = req.body;
    const file = req.file ? req.file.filename : null;

    // INSERT WORK ORDER
    const [result] = await db.query(
      `INSERT INTO work_orders (
    scheme_name,
    budget_head,
    approved_year,
    block_name,
    agreement_no,
    work_name,
    road_length,
    pan_no,
    package_no,
    vendor_name,
    work_order_name,
    work_order_number,
    work_order_start_date,
    completion_date,
    aa_cost,
    amount_put_to_tender,
    tendered_construction_amount,
    agreement_maintenance_amount,
    total_agreement_amount,
    accepted_rate,
    accepted_rate_percent,
    completion_period_months,
    approved_work_order_amount,
    paid_amount,
    remaining_amount,
    work_order_file,
    status,
    user_email
  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        scheme_name,
        budget_head,
        approved_year,
        block_name,
        agreement_no,
        work_name,
        road_length,
        pan_no,
        package_no,
        vendor_name,
        work_order_name,
        work_order_number,
        work_order_start_date,
        completion_date,
        aa_cost,
        amount_put_to_tender,
        tendered_construction_amount,
        agreement_maintenance_amount,
        total_agreement_amount,
        accepted_rate,
        accepted_rate_percent,
        completion_period_months,
        approved_work_order_amount,
        paid_amount,
        remaining_amount,
        file,
        status || "Pending",
        user_email,
      ],
    );

    // NOTIFICATION
    await db.query(`INSERT INTO notifications (message) VALUES (?)`, [
      `Work Order ${work_order_number} created successfully`,
    ]);

    // 📧 EMAIL (SAFE CHECK)
    if (user_email) {
      const html = `
        <div style="font-family:Arial;padding:20px;">
          <h2 style="color:green;">Work Order Created</h2>
          <p><b>Work Order No:</b> ${work_order_number}</p>
          <p><b>Work Name:</b> ${work_name}</p>
          <p><b>Vendor:</b> ${vendor_name}</p>
        </div>
      `;

      await sendMail(user_email, "Work Order Created", html);
    }

    res.status(201).json({
      message: "Work Order Created Successfully",
      workOrderId: result.insertId,
    });
  } catch (err) {
    console.log("WORK ORDER ERROR:", err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// ======================================================
// GET ALL WORK ORDERS (PAGINATION)
// ======================================================
router.get("/", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let offset = (page - 1) * limit;

    const [rows] = await db.query(
      "SELECT * FROM work_orders ORDER BY id DESC LIMIT ? OFFSET ?",
      [limit, offset],
    );

    const [count] = await db.query("SELECT COUNT(*) as total FROM work_orders");

    res.json({
      data: rows,
      total: count[0].total,
      page,
      totalPages: Math.ceil(count[0].total / limit),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ======================================================
// UPDATE WORK ORDER
// ======================================================
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      scheme_name,
      budget_head,
      approved_year,
      block_name,
      agreement_no,
      work_name,
      road_length,
      pan_no,
      package_no,
      vendor_name,
      work_order_name,
      work_order_number,
      work_order_start_date,
      completion_date,
      aa_cost,
      amount_put_to_tender,
      tendered_construction_amount,
      agreement_maintenance_amount,
      total_agreement_amount,
      accepted_rate,
      accepted_rate_percent,
      completion_period_months,
      approved_work_order_amount,
      paid_amount,
      remaining_amount,
      status,
    } = req.body;

    await db.query(
      `UPDATE work_orders SET
        scheme_name=?,
        budget_head=?,
        approved_year=?,
        block_name=?,
        agreement_no=?,
        work_name=?,
        road_length=?,
        pan_no=?,
        package_no=?,
        vendor_name=?,
        work_order_name=?,
        work_order_number=?,
        work_order_start_date=?,
        completion_date=?,
        aa_cost=?,
        amount_put_to_tender=?,
        tendered_construction_amount=?,
        agreement_maintenance_amount=?,
        total_agreement_amount=?,
        accepted_rate=?,
        accepted_rate_percent=?,
        completion_period_months=?,
        approved_work_order_amount=?,
        paid_amount=?,
        remaining_amount=?,
        status=?
      WHERE id=?`,
      [
        scheme_name,
        budget_head,
        approved_year,
        block_name,
        agreement_no,
        work_name,
        road_length,
        pan_no,
        package_no,
        vendor_name,
        work_order_name,
        work_order_number,
        work_order_start_date,
        completion_date,
        aa_cost,
        amount_put_to_tender,
        tendered_construction_amount,
        agreement_maintenance_amount,
        total_agreement_amount,
        accepted_rate,
        accepted_rate_percent,
        completion_period_months,
        approved_work_order_amount,
        paid_amount,
        remaining_amount,
        status,
        id,
      ],
    );

    res.json({ message: "Work Order Updated Successfully" });
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ======================================================
// DELETE WORK ORDER
// ======================================================
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM work_orders WHERE id=?", [id]);

    res.json({ message: "Work Order Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ======================================================
// CREATE PROPOSAL
// ======================================================
router.post("/create-proposal", async (req, res) => {
  try {
    const {
      work_order_id,
      proposal_no,
      proposal_amount,
      proposal_description,
      status,
      created_by,
      proposal_type,
      proposal_date,
      estimated_days,
      remarks,
    } = req.body;

    const creator = created_by || "Unknown User";

    if (!work_order_id) {
      return res.status(400).json({
        message: "Work Order ID is required",
      });
    }

    const [result] = await db.query(
      `INSERT INTO proposals (
        work_order_id,
        proposal_no,
        proposal_amount,
        proposal_description,
        status,
        created_by,
        proposal_type,
        proposal_date,
        estimated_days,
        remarks
      ) VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        work_order_id,
        proposal_no,
        proposal_amount,
        proposal_description,
        status || "Pending",
        creator,
        proposal_type || null,
        proposal_date || null,
        estimated_days || null,
        remarks || null,
      ],
    );

    await db.query(
      `UPDATE work_orders SET status='Proposal Created' WHERE id=?`,
      [work_order_id],
    );

    res.status(201).json({
      message: "Proposal Created Successfully",
      proposalId: result.insertId,
    });
  } catch (err) {
    console.log("PROPOSAL ERROR:", err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// ==========================
// GET ALL PROPOSALS
// ==========================
router.get("/proposals", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.*,
        w.work_order_number,
        w.work_name
      FROM proposals p
      JOIN work_orders w ON p.work_order_id = w.id
      ORDER BY p.id DESC
    `);

    res.json(rows);
  } catch (err) {
    console.log("GET PROPOSALS ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ==========================
// GET ALL PROPOSALS BY ID
// ==========================
router.get("/proposals/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT 
        p.*,
        w.work_order_number,
        w.work_name
      FROM proposals p
      JOIN work_orders w ON p.work_order_id = w.id
      WHERE p.id = ?
      `,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ==========================
// Delete PROPOSALS
// ==========================
router.delete("/proposals/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM proposals WHERE id=?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ==========================
// Approved PROPOSALS
// ==========================
router.put("/proposals/approve/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "UPDATE proposals SET status='Approved' WHERE id=?",
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res.json({
      message: "Proposal Approved Successfully",
    });
  } catch (err) {
    console.log("APPROVE ERROR:", err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/create-bill", async (req, res) => {
  try {
    const {
      proposal_id,
      work_order_id,
      bill_no,
      bill_amount,
      bill_description,
      created_by,
      bill_date,
      bill_type,
      gst_amount,
      net_amount,
      remarks
    } = req.body;

    console.log("BILL BODY:", req.body);

    // validation
    if (!proposal_id || !bill_no) {
      return res.status(400).json({
        message: "Proposal ID and Bill No required",
      });
    }

    const [result] = await db.query(
      `INSERT INTO bill (
        proposal_id,
        work_order_id,
        bill_no,
        bill_amount,
        bill_description,
        created_by,
        status,
        bill_date,
        bill_type,
        gst_amount,
        net_amount,
        remarks
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        proposal_id,
        work_order_id || null,
        bill_no,
        bill_amount,
        bill_description,
        created_by || "Unknown User",
        "Complete",
        bill_date || null,
        bill_type || null,
        gst_amount || 0,
        net_amount || 0,
        remarks || null,
      ]
    );

    await db.query(
      `UPDATE proposals SET status='Bill Created' WHERE id=?`,
      [proposal_id]
    );

    res.status(201).json({
      message: "Bill Created Successfully",
      billId: result.insertId,
    });

  } catch (err) {
    console.log("BILL ERROR:", err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});






// ======================================================
// View BILL
// ======================================================
router.get("/bills", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM bill ORDER BY id DESC");

    res.json({
      data: rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
