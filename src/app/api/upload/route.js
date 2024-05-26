import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";
export async function POST(req){
  const formData = await req.formData();
  if(formData.has('file')){
    const file=formData.get('file');
    //setting up S3 connection to upload background images
    const s3Client = new S3Client({
      region:'us-east-2',
      credentials:{
        accessKeyId:process.env.S3_ACCESS_KEY,
        secretAccessKey:process.env.S3_SECRET_ACCESS_KEY
      },
    });
    //renaming file to avoid collisions
    const randomId = uniqid();
    const ext = file.name.split('.').pop();
    const newFileName= randomId + '.' + ext;
    const bucketName = process.env.BUCKET_NAME;
    //preparing body of image
    const chunks= [];
    for await (const chuck of file.stream()){
      chunks.push(chuck);
    }

    await s3Client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key:newFileName,
      ACL: 'public-read',
      Body: Buffer.concat(chunks),
      ContentType: file.type,
    }));
    const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
    return Response.json(link);
  }
}