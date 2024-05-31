import { mongooseConnect } from "@/lib/mongoose";
import { NewUser } from "@/models/NewUser";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  await isAdminRequest(req,res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await NewUser.findOne({_id:req.query.id}));
    } else {
      res.json(await NewUser.find());
    }
  }

  if (method === 'POST') {
    const {name, email, password} = req.body;
    const NewUserDoc = await NewUser.create({
      name, email, password,
    })
    res.json(NewUserDoc);
  }

  if (method === 'PUT') {
    const {name, email, password, _id} = req.body;
    await NewUser.updateOne({_id}, {name, email, password});
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await NewUser.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}