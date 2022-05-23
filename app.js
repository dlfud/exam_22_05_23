// const express = require('express')
import express from "express"; // import로 가져옴
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "sbsst", // 사용자이름
  password: "sbs123414", // 비번
  database: "a9", // 데이터 베이스
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const app = express()
const port = 3000 // 포트번호 알려줌

//데이터 받을 준비
app.use(express.json());

/*생성*/
app.post('/todos', async(req, res) => {
  const{reg_date, perform_date, is_completed, content} = req.body;

  if(!reg_date){
    res.status(400).json({
      msg:"reg_date required",
    });
    return;
  }

  if(!perform_date){
    res.status(400).json({
      msg:"perform_date required",
    });
    return;
  }

  if(!is_completed){
    res.status(400).json({
      msg:"is_completed required",
    });
    return;
  }

  if(!content){
    res.status(400).json({
      msg:"content required",
    });
    return;
  }

  const[rs] = await pool.query(
    `INSERT INTO todo 
    SET reg_date = ?, perform_date = ?, is_completed = ?, content = ?`,
    [reg_date, perform_date, is_completed, content]
  );

  res.json({
    msg: "할일이 생성되엇습니다.",
  });
});

app.listen(port);

// app.listen(port, () => { // 실행
//   console.log(`Example app listening on port ${port}`)
// })

/*삭제
app.delete('/todos/:id', async (req, res) => { //get요청, /로 요청이 들어오면 함수 실행됨
  // const id = req.params.id;
  const {id} = req.params;
  //해킹에 취약하므로 사용하지마
  // const[rows] = await pool.query(`SELECT * FROM todo WHERE id = ${id} LIMIT 1`);
  const[rows] = await pool.query(`SELECT * FROM todo WHERE id = ?`, [id]);
  //데이터가 없으면
  if(rows.length == 0){
    res.status(404).json({
      msg: "not found",
    });
    return;
  };

  const[rs] = await pool.query(
    `DELETE FROM todo WHERE id = ?`, [id]
  );

  res.json({
    msg: `${id}번 할일이 삭제되었습니다.`
  });
});

app.listen(port);
*/

/*수정
app.patch('/todos/:id', async (req, res) => { //get요청, /로 요청이 들어오면 함수 실행됨
  // const id = req.params.id;
  const {id} = req.params;
  //해킹에 취약하므로 사용하지마
  // const[rows] = await pool.query(`SELECT * FROM todo WHERE id = ${id}`);
  const[rows] = await pool.query(`SELECT * FROM todo WHERE id = ?`, [id]);
  //데이터가 없으면
  if(rows.length == 0){
    res.status(404).json({
      msg: "not found",
    });
    return;
  };
  //데이터 받아옴?
  const{perform_date, content} = req.body;
  //바꾸려는 데이터가 이상하면
  if(!perform_date){
    res.status(400).json({
      msg: "perform_date required",
    });
    return;
  }
  if(!content){
    res.status(400).json({
      msg: "content required",
    });
    return;
  }

  const[rs] = await pool.query(
    `UPDATE todo SET perform_date = ?,
    content = ? WHERE id = ?`,
    [perform_date, content, id]
  );

  res.json({
    msg: `${id}번 할일이 수정되었습니다.`
  });
});
app.listen(port);
*/

/* 단건조회 
app.get('/todos/:id', async (req, res) => { //get요청, /로 요청이 들어오면 함수 실행됨
  // const id = req.params.id;
  const {id} = req.params;
  //해킹에 취약하므로 사용하지마
  // const[rows] = await pool.query(`SELECT * FROM todo WHERE id = ${id} LIMIT 1`);
  const[rows] = await pool.query(`SELECT * FROM todo WHERE id = ?`, [id]);
  //데이터가 없으면
  if(rows.length == 0){
    res.status(404).json({
      msg: "not found",
    });
    return;
  };
  res.json(rows[0]);
});
app.listen(port);
*/

/*
 // req : 받은 편지, res : 보낼 편지
app.get('/todos', async (req, res) => { //get요청, /로 요청이 들어오면 함수 실행됨
  const[rows] = await pool.query(`SELECT * FROM TODO ORDER BY id`);

  res.json(rows);
});
app.listen(port);
*/