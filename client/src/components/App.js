import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FIRE_PERSON, HIRE_PERSON } from "../ducks/person";
import Spinner from "./Spinner";
import IndexPage from "./IndexPage";
import PersonPage from "./PersonPage";
import NotFoundPage from "./NotFoundPage";
import Notifications from "./notifications/Notifications";
import { Switch, Route } from "react-router";
import { NOTIFICATION_DISMISS } from "../ducks/notification";
import { LOGIN, LOGOUT } from "../ducks/auth";

const App = () => {
  const dispatch = useDispatch();

  const persons = useSelector(state => state.person.get("persons"));
  const loading = useSelector(state => state.ui.get("loading") > 0);
  const isLoggedIn = useSelector(
    state => state.auth.get("token") !== undefined
  );

  const notifications = useSelector(state =>
    state.notification.get("notifications")
  );

  const login = useCallback(
    (email, password) => {
      dispatch({ type: LOGIN, payload: { email, password } });
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    dispatch({ type: LOGOUT });
  }, [dispatch]);

  const dismissNotification = useCallback(
    id => {
      dispatch({
        type: NOTIFICATION_DISMISS,
        payload: id
      });
    },
    [dispatch]
  );

  const firePerson = useCallback(
    id => {
      console.log("Son, you do not disappoint anymore.");
      dispatch({ type: FIRE_PERSON, payload: id });
    },
    [dispatch]
  );

  const hirePerson = person => {
    dispatch({ type: HIRE_PERSON, payload: person });
  };

  return (
    <div>
      <Notifications
        notifications={notifications}
        dismissNotification={dismissNotification}
      />

      {loading && <Spinner />}

      <h1>Fraktio Space Odyssey 2001</h1>

      <p>
        {isLoggedIn && (
          <button
            type="button"
            onClick={() => {
              logout();
            }}
          >
            Log out Lohiposki
          </button>
        )}
        {!isLoggedIn && (
          <button
            type="button"
            onClick={() =>
              login("gaylord.lohiposki@dr-kobros.com", "gaylordpassu")
            }
          >
            Log in Lohiposki
          </button>
        )}
      </p>

      <Switch>
        <Route
          exact
          path="/"
          render={props => {
            return (
              <IndexPage
                readOnly={!isLoggedIn}
                hirePerson={hirePerson}
                firePerson={firePerson}
                persons={persons}
              />
            );
          }}
        />
        <Route
          exact
          path="/person/:id"
          render={props => {
            const person = persons.get(props.match.params.id);
            return <PersonPage person={person} />;
          }}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default App;
