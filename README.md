# EventListener

This repo contains a minimal Azure Functions app (Node.js) with an HTTP trigger and a Blob trigger.

**Blob Trigger**
- Folder: `BlobTrigger`
- Trigger binding: monitors the container `samples-workitems` (see `BlobTrigger/function.json`).
- What it does: logs blob name, size, and a small content preview.

Running locally:

1. Install the Azure Functions Core Tools (v4) and Node 18+.
2. Start the Azure Storage emulator or provide a connection string in `local.settings.json` under `AzureWebJobsStorage`.
	- For local development use Azurite or the Storage emulator. Example `local.settings.json` uses `UseDevelopmentStorage=true`.
3. From the repo root, run:

```
npm install
func start
```

To test the blob trigger, upload a blob to the `samples-workitems` container in the same storage account the function is pointed at.

Notes:
- The container path used by the trigger is `samples-workitems/{name}`. Change the `path` in `BlobTrigger/function.json` if you want a different container.
- `local.settings.json` currently uses `UseDevelopmentStorage=true` for Azurite. Replace with a real storage connection string for cloud deployments.
