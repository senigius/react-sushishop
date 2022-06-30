const updatePageCount = (itemsLength: number) => { 
  const pageNumber = itemsLength / 8;
  return Math.ceil(pageNumber === 1 ? pageNumber + 1 : pageNumber);
}

export default updatePageCount;