export const getStation = (data, id) => {
  let val = data.filter((item) => item.Id == id)[0];

  return { label: val.Name, value: val.Id };
};

export function dropDownvalues(data) {
  return data.map((item) => {
    return { label: item.Name, value: item.Id };
  });
}

export const getRooms = (roomData) => {
  let rooms = roomData.map((room) => {
    return {
      label: room.Name,
      value: room.RoomId,
    };
  });

  return rooms;
};
