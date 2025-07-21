import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useComments } from '../../hooks/useComments';
import CommentForm from '../../components/comments/CommentForm';
import CommentList from '../../components/comments/CommentList';
import PrivateRoute from '../../components/auth/PrivateRoute';
import { PERMISSIONS } from '../../constants';

const OrderList = () => {
  const { user } = useAuth();
  const { pageId = 'orders' } = useParams();
    const {
    comments,
    loading,
    error,
    addComment,
    updateComment,
    deleteComment,
    getCommentHistory
  } = useComments(pageId);

  const canView = user?.permissions?.[pageId]?.includes(PERMISSIONS.VIEW);
  const canEdit = user?.permissions?.[pageId]?.includes(PERMISSIONS.EDIT);
  const canDelete = user?.permissions?.[pageId]?.includes(PERMISSIONS.DELETE);
  const canCreate = user?.permissions?.[pageId]?.includes(PERMISSIONS.CREATE);

  if (!canView) {
    return <div className="alert alert-warning">You don't have permission to view this page.</div>;
  }

  return (
    <div className="page-container">
      <h2>Order List</h2>
      <p>View and manage customer orders.</p>
      
      {canCreate && (
        <div className="mb-4">
          <CommentForm onSubmit={addComment} />
        </div>
      )}

      <CommentList
        comments={comments}
        loading={loading}
        error={error}
        canEdit={canEdit}
        canDelete={canDelete}
        onEdit={updateComment}
        onDelete={deleteComment}
        onViewHistory={getCommentHistory}
      />
    </div>
  );
};

const ProtectedOrderList = () => (
  <PrivateRoute requiredPermission={{ page: 'orders', action: PERMISSIONS.VIEW }}>
    <OrderList />
  </PrivateRoute>
);

export default ProtectedOrderList;