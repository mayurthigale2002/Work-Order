const db = require("../config/db");

exports.getNotifications = (
  req,
  res
) => {
  const userId = req.user.id;

  const sql = `
  SELECT *
  FROM notifications
  WHERE user_id=?
  ORDER BY created_at DESC
  `;

  db.query(
    sql,
    [userId],
    (err, result) => {
      if (err)
        return res.status(500).json(err);

      res.json(result);
    }
  );
};