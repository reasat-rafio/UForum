// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";

// type Data = {
//   name: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<any>
// ) {
//   const { query, method, body } = req;

//   switch (method) {
//     case "GET":
//       const _data = await axios.get("http://localhost:8080/users");

//       res.status(200).json(_data);
//       // Get data from your database
//       //   res.status(200).json({ id, name: `User ${id}` });
//       break;
//     case "POST":
//       // const data = axios.post("http://localhost:8080/users", body);
//       const data = axios.get("http://localhost:8080/users");

//       res.status(200).json({ data });
//       break;
//     default:
//       res.setHeader("Allow", ["GET", "PUT"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }
