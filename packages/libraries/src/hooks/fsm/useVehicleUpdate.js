import { useMutation } from "react-query";
import { FSMService } from "../../services/elements/FSM";

const useVehicleUpdate = () => {
  return useMutation((details) => FSMService.update(details));
};

export default useVehicleUpdate;
