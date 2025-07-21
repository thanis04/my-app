import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useComments } from '../../hooks/useComments';
import CommentForm from '../../components/comments/CommentForm';
import CommentList from '../../components/comments/CommentList';
import PrivateRoute from '../../components/auth/PrivateRoute';
import { PERMISSIONS } from '../../constants';

const FinanceAccounting = () => {
  const { user } = useAuth();
  const { pageId = 'finance' } = useParams();
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
      <h2>Finance & Accounting</h2>
      <p>Manage financial records and accounting data.</p>
      
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

const ProtectedFinanceAccounting = () => (
  <PrivateRoute requiredPermission={{ page: 'finance', action: PERMISSIONS.VIEW }}>
    <FinanceAccounting />
  </PrivateRoute>
);

export default ProtectedFinanceAccounting;