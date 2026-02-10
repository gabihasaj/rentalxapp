const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwD2MECUxQ01WI3r7sNGzyHz6fXwjPEnsEQCIEbfuXFs6gYnFO48zmnMWqIVfj94MhA/exec"; // .../exec


async function postJson(body) {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    // IMPORTANT: no headers here (avoids preflight/CORS issues)
    body: JSON.stringify(body),
    redirect: "follow",
  });

  const text = await res.text();

  // Apps Script sometimes returns HTML if not deployed correctly
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      "Server returned a non-JSON response (often a deployment/permission issue). Response:\n" +
        text.slice(0, 200)
    );
  }

  return data;
}

export async function getBookedDates(trailerType) {
  return postJson({ action: "availability", trailerType, days: 31 });
}

export async function createBooking(payload) {
  return postJson({ action: "book", ...payload });
}
