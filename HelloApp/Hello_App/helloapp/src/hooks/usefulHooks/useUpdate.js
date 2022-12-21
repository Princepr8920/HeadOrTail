 export default function useUpdate() {

  function UPDATED_FIELDS(newInputs,oldInputs) {
    let updated = {};
    for (let obj in newInputs) {
      if (oldInputs[obj] !== newInputs[obj]) {
        updated[obj] = newInputs[obj] !== "" ? newInputs[obj] : "";
      }
    }
    return updated;
  }

  return  UPDATED_FIELDS
}
