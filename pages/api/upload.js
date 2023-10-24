import multiparty from "multiparty";

export default async function handleUpload(req, res) {
  const form = new multiparty.Form();
  if (err) throw err;
  form.parse(req, async (err, fields, files) => {
    console.log(files.lenght);
    res.json("ok");
  });
}

export const config = {
  api: { bodyParser: false },
};
