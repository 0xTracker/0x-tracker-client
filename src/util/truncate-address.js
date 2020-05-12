const truncateAddress = (address, maxLength = 33) => {
  const sliceSize = (maxLength - 3) / 2;

  return `${address.slice(0, sliceSize)}...${address.slice(
    address.length - sliceSize,
  )}`;
};

export default truncateAddress;
