export default (openDate: Date):number=> {
  const today: Date = new Date();

  // Ouverture en temps
  const openTime = today.getTime() - openDate.getTime();
    
  // Ouverture en jour
  return  Math.round(openTime / (1000 * 3600 * 24));
}