const choice = async (lists: string[]) => {
  const randomIndex = Math.floor(Math.random() * lists.length);
  return lists[randomIndex];
};

export default { choice };
