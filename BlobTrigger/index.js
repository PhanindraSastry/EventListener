module.exports = async function (context, myBlob) {
  try {
    context.log(`Blob trigger function is  triggered`);
    const blobName = context.bindingData && context.bindingData.name;
    const size = myBlob ? (typeof myBlob === 'string' ? Buffer.byteLength(myBlob) : myBlob.length) : 0;

    context.log(`Blob trigger function processed blob. Name: ${blobName}`);
    context.log(`Blob size: ${size} bytes`);

    // Prepare a preview string (if possible) for diagnostics.
    let preview = null;
    if (myBlob && size > 0) {
      preview = myBlob;
      if (typeof myBlob !== 'string') {
        try {
          preview = myBlob.toString('utf8');
        } catch (e) {
          preview = '<binary data - not shown>';
        }
      }
      context.log('Blob preview:', preview.substring(0, 200));
    }

    // Write a small JSON metadata blob to the `processed` folder so you can verify processing.
    const processed = {
      originalName: blobName || null,
      size: size,
      processedAt: new Date().toISOString(),
      preview: preview ? preview.substring(0, 200) : undefined
    };

    context.bindings = context.bindings || {};
    context.bindings.processedBlob = JSON.stringify(processed, null, 2);

    // Put any processing logic here (e.g., move to another container, call other services, etc.)
  } catch (err) {
    context.log.error('Error processing blob trigger', err);
    throw err;
  }
};
