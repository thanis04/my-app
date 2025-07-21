import React from 'react';
import Comment from './Comment';
import { Alert, Spinner } from 'react-bootstrap';

const CommentList = ({
  comments,
  loading,
  error,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
  onViewHistory
}) => {
  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">Error loading comments: {error}</Alert>;
  }

  if (comments.length === 0) {
    return <Alert variant="info">No comments yet. Be the first to add one!</Alert>;
  }

  return (
    <div className="comment-list">
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          canEdit={canEdit}
          canDelete={canDelete}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewHistory={onViewHistory}
        />
      ))}
    </div>
  );
};

export default CommentList;