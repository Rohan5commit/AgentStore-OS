export async function generateDeliverable(serviceName: string, notes: string) {
  const apiKey = process.env.NVIDIA_NIM_API_KEY;
  if (!apiKey) {
    return `Demo deliverable for ${serviceName}:\n- Key insights\n- Suggested edits\n- Next steps\nContext: ${notes || "No extra context provided."}`;
  }

  try {
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        messages: [
          { role: "system", content: "You are an operations AI that fulfills paid digital services with concise, structured outputs." },
          { role: "user", content: `Service: ${serviceName}\nCustomer Notes: ${notes}\nReturn a practical fulfillment output with sections: Summary, Output, Next Steps.` }
        ],
        temperature: 0.4,
        max_tokens: 700
      })
    });

    if (!response.ok) {
      return `Fallback deliverable for ${serviceName}.`;
    }

    const json = await response.json();
    return json.choices?.[0]?.message?.content ?? `Fallback deliverable for ${serviceName}.`;
  } catch {
    return `Fallback deliverable for ${serviceName}.`;
  }
}
