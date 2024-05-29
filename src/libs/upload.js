import toast from "react-hot-toast";

//handles uploading files to s3 server
export async function upload(ev, callbackFn) {
  const file = ev.target.files?.[0];

  if (file) {
    const uploadPromise = new Promise((resolve, reject) => {
      //upload file and set it to state
      const data = new FormData();
      data.set('file', file);
      fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then(response => { //if upload want to change bg
        if (response.ok) {
          response.json().then(link => {
            callbackFn(link);
            resolve(link);
          });
        } else {
          reject();
        }
      });
    });

    await toast.promise(uploadPromise, {
      loading: 'Uploading...',
      success: 'Uploaded!',
      error: 'Failed to upload',
    });
  }
}