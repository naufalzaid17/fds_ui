export default function handler(req, res){
    if(req.method !== 'POST'){
      res.status(405).end();
      return;
    }
  
    try {
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Failed to read data'})
    }
  }