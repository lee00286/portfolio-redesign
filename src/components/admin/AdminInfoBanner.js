import { ADMIN_BANNER_TYPE } from '@/constants/admin';
import ConfirmModalButton from './ConfirmModalButton';

function AdminInfoBanner({
  type = ADMIN_BANNER_TYPE.INFO,
  message,
  confirmTitle,
  confirmDescription,
  action = null
}) {
  return (
    <div
      className={`
        flex flex-col justify-center items-center gap-3 mb-4 py-4 w-full ${
          type === ADMIN_BANNER_TYPE.SUCCESS
            ? 'bg-green-200 text-green-600'
            : type === ADMIN_BANNER_TYPE.WARNING
              ? 'bg-orange-200 text-orange-600'
              : type === ADMIN_BANNER_TYPE.ERROR
                ? 'bg-red-200 text-red-600'
                : type === ADMIN_BANNER_TYPE.IMPORTANT
                  ? 'bg-red-200 text-red-600'
                  : 'bg-gray-300 text-gray-600' // Info
        }
      `}
    >
      {message && <h2 className="h3 capitalize">{message}</h2>}
      {action?.label && action.onClick && (
        <ConfirmModalButton
          text={action.label}
          data={{
            title: confirmTitle || 'Are you sure?',
            description: confirmDescription || '',
            onConfirm: action.onClick,
            disabled: !!action.disabled
          }}
        />
      )}
    </div>
  );
}

export default AdminInfoBanner;
