const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'y1utd2lb',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false
});

client.fetch(`*[_type == "about"][0]`).then(res => {
  console.log("FETCH RESULT:", res);
}).catch(console.error);
