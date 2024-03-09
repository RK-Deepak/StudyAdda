const cloudinary=require("cloudinary").v2

exports.imageUplaodOnCloud=async(file,folder,height,quality)=>
{
    try 
    {
        const options={
            folder,
          resource_type:"auto"
        }
        if(height)
        {
            options.height=height;
        }
        if(quality)
        {
            options.quality=quality;
        }
        
        
        
        const fileuploaded=await cloudinary.uploader.upload(file.tempFilePath,options);
        return fileuploaded;
    }
    catch(error)
    {
         console.log(error)
    }
}