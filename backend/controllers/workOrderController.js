const db = require("../config/db");

exports.createWorkOrder = async (
  req,
  res
) => {
  try {
    const {
      scheme,
      budget_head,
      approved_year,
      work_name,
      vendor_name,
      work_order_number,
    } = req.body;

    await db.query(
      `INSERT INTO work_orders
      (scheme,budget_head,approved_year,work_name,vendor_name,work_order_number)
      VALUES (?,?,?,?,?,?)`,
      [
        scheme,
        budget_head,
        approved_year,
        work_name,
        vendor_name,
        work_order_number,
      ]
    );

    res.status(201).json({
      message:
        "Work Order Created Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};




exports.createProposal = async (req, res) => {
  try {
    const {
      work_order_id,
      proposal_no,
      proposal_amount,
      proposal_description,
    } = req.body;

    await db.query(
      `INSERT INTO proposals
      (work_order_id, proposal_no, proposal_amount, proposal_description)
      VALUES (?, ?, ?, ?)`,
      [
        work_order_id,
        proposal_no,
        proposal_amount,
        proposal_description,
      ]
    );

    await db.query(
      `UPDATE work_orders
       SET status='Proposal Created'
       WHERE id=?`,
      [work_order_id]
    );

    res.json({
      message: "Proposal Created Successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};