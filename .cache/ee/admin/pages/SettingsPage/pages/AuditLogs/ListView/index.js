import React from 'react';
import { useIntl } from 'react-intl';
import {
  SettingsPageTitle,
  DynamicTable,
  useRBAC,
  useNotification,
  useFocusWhenNavigate,
  useFetchClient,
  useQueryParams,
} from '@strapi/helper-plugin';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Main } from '@strapi/design-system/Main';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import adminPermissions from '../../../../../../../admin/src/permissions';
import TableRows from './TableRows';
import tableHeaders from './utils/tableHeaders';
import PaginationFooter from './PaginationFooter';
import Modal from './Modal';

const ListView = () => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();
  const {
    allowedActions: { canRead },
  } = useRBAC(adminPermissions.settings.auditLogs);
  const { get } = useFetchClient();
  const { search } = useLocation();
  const [{ query }, setQuery] = useQueryParams();

  useFocusWhenNavigate();

  const fetchAuditLogsPage = async ({ queryKey }) => {
    const search = queryKey[1];
    const { data } = await get(`/admin/audit-logs${search}`);

    return data;
  };

  const { data, isLoading } = useQuery(['auditLogs', search], fetchAuditLogsPage, {
    enabled: canRead,
    keepPreviousData: true,
    retry: false,
    staleTime: 1000 * 10,
    onError() {
      toggleNotification({
        type: 'warning',
        message: { id: 'notification.error', defaultMessage: 'An error occured' },
      });
    },
  });

  const title = formatMessage({
    id: 'global.auditLogs',
    defaultMessage: 'Audit Logs',
  });

  const headers = tableHeaders.map((header) => ({
    ...header,
    metadatas: {
      ...header.metadatas,
      label: formatMessage(header.metadatas.label),
    },
  }));

  return (
    <Main aria-busy={isLoading}>
      <SettingsPageTitle name={title} />
      <HeaderLayout
        title={title}
        subtitle={formatMessage({
          id: 'Settings.permissions.auditLogs.listview.header.subtitle',
          defaultMessage: 'Logs of all the activities that happened in your environment',
        })}
      />
      <ContentLayout canRead={canRead}>
        <DynamicTable
          contentType="Audit logs"
          headers={headers}
          rows={data?.results || []}
          withBulkActions
          isLoading={isLoading}
        >
          <TableRows
            headers={headers}
            rows={data?.results || []}
            onOpenModal={(id) => setQuery({ id })}
          />
        </DynamicTable>
        <PaginationFooter pagination={data?.pagination} />
      </ContentLayout>
      {query?.id && <Modal handleClose={() => setQuery({ id: null }, 'remove')} logId={query.id} />}
    </Main>
  );
};

export default ListView;
