import React from 'react';

import {
  ListGroup,
  ListGroupProps,
  ListGroupItem,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

import PropTypes from '@/utils/propTypes';

export interface TodoProps {
  id: string | number;
  title?: string;
  done: boolean;
}

export interface TodosProps extends ListGroupProps {
  todos: TodoProps[];
}

// export const propTypes = {
//   todos: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.ID,
//       title: PropTypes.string,
//       done: PropTypes.bool,
//     }),
//   ),
// };

export const Todos: React.FunctionComponent<TodosProps> = ({
  todos,
  ...restProps
}) => {
  return (
    <ListGroup flush {...restProps}>
      {todos.map(({ id, title, done }) => (
        <ListGroupItem key={id} className="border-0">
          <FormGroup check>
            <Label check>
              <Input type="checkbox" checked={done} readOnly />
              {done ? <>{title}</> : <span>{title}</span>}
            </Label>
          </FormGroup>
        </ListGroupItem>
      ))}
      <Button block>Add</Button>
    </ListGroup>
  );
};

Todos.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.ID,
      title: PropTypes.string,
      done: PropTypes.bool,
    }),
  ),
} as React.ValidationMap<TodosProps>;

Todos.defaultProps = {
  todos: [],
};
