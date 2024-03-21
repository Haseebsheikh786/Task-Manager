import axios from "axios";

export function fetchPhase() {
  return axios.get("http://localhost:8000/");
}
export function createPhase(data) {
  return axios.post("http://localhost:8000/", data);
}
export function deletePhase(id) {
  return axios.delete(`http://localhost:8000/${id}`);
}
export function editPhase(id, data) {
  return axios.patch(`http://localhost:8000/${id}`, data);
}
