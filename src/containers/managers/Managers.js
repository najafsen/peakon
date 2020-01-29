import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadManagers } from "../../actions/managers.action";
import { selectManagersItems } from "../../selectors/managers.selector";

export const Managers = () => {
  const dispatch = useDispatch();
  const managers = useSelector(selectManagersItems);

  useEffect(() => {
    dispatch(loadManagers());
  }, [dispatch]);

  return (
    <div>
      {managers.map(manager => (
        <p key={manager.id}>
          {manager.attributes.firstName} {manager.attributes.lastName}
        </p>
      ))}
    </div>
  );
};
