export async function predictMFI(inputData, baseUrl) {
  if (!inputData?.length === 4)
    throw new Error('Invalid input data for prediction.');

  const res = await fetch(`${baseUrl}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: inputData }),
  });

  const json = await res.json();

  if (!res.ok || json.error) {
    throw new Error(json.error || `Server error: ${res.status}`);
  }

  return json;
}