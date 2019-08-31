import React, { memo } from "react";
import styled, { css } from "styled-components";
import { lighten } from "polished";
import { Link } from "react-router-dom";

const Person = props => {
  const { person, className, firePerson, readOnly } = props;
  return (
    <div className={className}>
      <Link to={`/person/${person.id}`}>
        {person.lastName}, {person.firstName}
      </Link>
      {!readOnly && (
        <div>
          <button
            disabled={person.isBeingFired}
            onClick={() => firePerson(person.id)}
          >
            Liberate
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(styled(Person)`
  border: 10px solid rgb(0, 0, 0);
  margin: 1em 0;
  border-radius: 10px;
  padding: 1em;

  ${props =>
    props.person.gender === "m" &&
    css`
      background-color: rgb(200, 200, 255);
      &:hover {
        background-color: ${lighten(0.05, "rgb(200, 200, 255)")};
      }
    `}

  ${props =>
    props.person.gender === "f" &&
    css`
      background-color: rgb(255, 200, 200);
    `}
`);
