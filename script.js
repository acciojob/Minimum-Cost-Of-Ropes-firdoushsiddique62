 function calculateMinCost(){
  const inputRopes = document.getElementById("inputRopes").value;
  const ropeLengths = inputRopes.split(",").map(Number);

  function MinHeap() {
    this.heap = [];

    this.insert = function (value) {
      this.heap.push(value);
      this.bubbleUp(this.heap.length - 1);
    };

    this.extractMin = function () {
      if (this.heap.length === 0) {
        return null;
      }

      if (this.heap.length === 1) {
        return this.heap.pop();
      }

      const minValue = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.bubbleDown(0);

      return minValue;
    };

    this.bubbleUp = function (index) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (parentIndex >= 0 && this.heap[index] < this.heap[parentIndex]) {
        [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
        this.bubbleUp(parentIndex);
      }
    };

    this.bubbleDown = function (index) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallestIndex = index;

      if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
        smallestIndex = leftChildIndex;
      }

      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
        smallestIndex = rightChildIndex;
      }

      if (smallestIndex !== index) {
        [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
        this.bubbleDown(smallestIndex);
      }
    };
  }

  const minHeap = new MinHeap();
  ropeLengths.forEach(length => minHeap.insert(length));

  let totalCost = 0;
  while (minHeap.heap.length > 1) {
    const combinedLength = minHeap.extractMin() + minHeap.extractMin();
    totalCost += combinedLength;
    minHeap.insert(combinedLength);
  }

  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `Minimum cost: ${totalCost}`;
}