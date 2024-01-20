export const searchDataset = (el) => {
  let dataset = el.dataset;
  dataset = JSON.parse(JSON.stringify(dataset));
  let isEmpty = Object.keys(dataset).length;

  if (isEmpty != 0) {
    return dataset;
  } else {
    dataset = el.parentNode.dataset;
    dataset = JSON.parse(JSON.stringify(dataset));
    isEmpty = Object.keys(dataset).length;
  }

  if (isEmpty != 0) {
    return dataset;
  } else {
    dataset = el.parentNode.dataset;
    dataset = JSON.parse(JSON.stringify(dataset));
    isEmpty = Object.keys(dataset).length;
  }

  if (isEmpty != 0) {
    return dataset;
  } else {
    console.error("Internal error: Dataset not found");
  }
};
