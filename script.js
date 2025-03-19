const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const result = document.getElementById('result');

let model;

const loadModel = async () => {
  model = await mobilenet.load();
  console.log('Model Loaded!');
};

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    preview.src = url;

    preview.onload = async () => {
      result.innerHTML = 'Classifying...';

      // Run classification
      const predictions = await model.classify(preview);

      // Display results
      result.innerHTML = predictions
        .map(
          (pred) =>
            `${pred.className}: ${(pred.probability * 100).toFixed(2)}%`
        )
        .join('<br>');
    };
  }
});

// Load the model when the page loads
loadModel();
