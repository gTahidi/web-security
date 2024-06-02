export interface Pii {
  pii: boolean
  message: string
}

export interface Detector {
  detect: (promptText: string) => Pii
  toggleIdentifier: string
}

type DetectorStatus = Record<string, boolean>

const detectorsRegistry: Detector[] = []

export function registerDetectors (detectors: Detector[]): void {
  detectorsRegistry.push(...detectors)
}

async function getDetectorsStatus (): Promise<DetectorStatus> {
  const toggleIdentifiers = detectorsRegistry.map((detector) => {
    return detector.toggleIdentifier
  })
  return await chrome.storage.sync.get(toggleIdentifiers)
}

export async function getDetectorsMessage (promptText: string): Promise<string> {
  let message = ''
  const detectorsStatus = await getDetectorsStatus()

  for (const { detect, toggleIdentifier } of detectorsRegistry) {
    if (detectorsStatus[toggleIdentifier]) {
      message += detect(promptText).message
    }
  }
  return message
}

export async function countTriggeredDetectors (promptText: string): Promise<number> {
  let triggeredDetectors = 0
  const detectorsStatus = await getDetectorsStatus()

  for (const { detect, toggleIdentifier } of detectorsRegistry) {
    if (detectorsStatus[toggleIdentifier] && detect(promptText).pii) {
      triggeredDetectors++
    }
  }
  return triggeredDetectors
}

export async function getTriggeredDetectors (promptText: string): Promise<string[]> {
  const triggeredDetectors: string[] = []
  const detectorsStatus = await getDetectorsStatus()

  for (const { detect, toggleIdentifier } of detectorsRegistry) {
    if (detectorsStatus[toggleIdentifier] && detect(promptText).pii) {
      triggeredDetectors.push(toggleIdentifier)
    }
  }
  return triggeredDetectors
}

// TO DO:
// add API end-points to an outer Managed Database and Dashboard
/*
export async function getDetectorsMessage(promptText) {
  let message = '';
  const detectorsStatus = await getDetectorsStatus();

  for (const { detect, toggleIdentifier } of detectorsRegistry) {
    if (detectorsStatus[toggleIdentifier]) {
      const detectionResult = detect(promptText);
      message += detectionResult.message;
      if (detectionResult.pii) {
        // Send PII data to Azure Function
        await sendPiiDataToAzureFunction(promptText);
      }
    }
  }
  return message;
}

async function sendPiiDataToAzureFunction(piiData) {
  const response = await fetch('https://your-azure-function-url/api/your-function-name', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ piiData })
  });

  if (!response.ok) {
    console.error('Failed to send data to Azure Function:', response.statusText);
  }
}
*/

