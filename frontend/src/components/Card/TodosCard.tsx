import React from 'react';
import PropTypes from '@/utils/propTypes';

import { Card, CardImg, CardImgOverlay, CardTitle, CardText } from 'reactstrap';

import { Todos, TodoProps } from '@/components/Todos';

import backgroundImage from '@/assets/img/bg/background_1920-2.jpg';

export interface TodosCardProps {
  image?: string;
  title?: string;
  subtitle?: string;
  todos?: TodoProps[];
}

export const TodosCard: React.FunctionComponent<TodosCardProps> = ({
  image = backgroundImage,
  title = 'Tasks',
  subtitle = 'Due soon...',
  todos = [],
  ...restProps
}) => {
  return (
    <Card {...restProps}>
      <div className="position-relative">
        <CardImg src={image} />
        <CardImgOverlay className="bg-dark" style={{ opacity: 0.2 }}>
          <CardTitle className="text-white">{title}</CardTitle>
          <CardText className="text-white">{subtitle}</CardText>
        </CardImgOverlay>
      </div>
      <Todos todos={todos} />
    </Card>
  );
};

TodosCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  todos: (Todos.propTypes as any).todos,
} as React.ValidationMap<TodosCardProps>;

TodosCard.defaultProps = {
  image: backgroundImage,
  title: 'Tasks',
  subtitle: 'Due soon...',
};
