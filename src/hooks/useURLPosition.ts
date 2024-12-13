import { useSearchParams } from "react-router-dom";

export function useURLPosition() {
  const [params] = useSearchParams();

  const lat = Number(params.get("lat"));
  const lng = Number(params.get("lng"));

  return { lat, lng };
}
