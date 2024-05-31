import { mongooseConnect } from "@/lib/mongoose";
import { NewUser } from "@/models/NewUser";

export default async function handle(req,res) {
  const {method} = req;
  await mongooseConnect();
  res.json(await NewUser.find());

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
}