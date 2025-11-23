module.exports = async function (context, myBlob) {
  try {
    const blobName = context.bindingData && context.bindingData.name;
    const size = myBlob ? (typeof myBlob === 'string' ? Buffer.byteLength(myBlob) : myBlob.length) : 0;

    context.log(`Blob trigger function processed blob. Name: ${blobName}`);
    context.log(`Blob size: ${size} bytes`);

    // If blob content is small, log its first 200 characters for debugging.
    if (myBlob && size > 0) {
      let preview = myBlob;
      if (typeof myBlob !== 'string') {
        try {
          preview = myBlob.toString('utf8');
        } catch (e) {
          preview = '<binary data - not shown>';
        }
      }
      context.log('Blob preview:', preview.substring(0, 200));
    }

    // Put any processing logic here (e.g., move to another container, call other services, etc.)
  } catch (err) {
    context.log.error('Error processing blob trigger', err);
    throw err;
  }
};
