/* eslint-disable prefer-template */

/* eslint-disable no-console */
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAsync from 'react-use/esm/useAsync';
import {
  Entity,
  parseEntityRef,
  stringifyEntityRef,
} from '@backstage/catalog-model';
import { Content, Page } from '@backstage/core-components';
import { useApi, useRouteRef } from '@backstage/core-plugin-api';
import {
  EntityKindPicker,
  EntityListProvider,
  CatalogFilterLayout,
  UserListPicker,
  catalogApiRef,
} from '@backstage/plugin-catalog-react';
import { scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { TemplateEntityV1beta3 } from '@backstage/plugin-scaffolder-common';
import { TemplateGroupFilter } from '@backstage/plugin-scaffolder-react';
import {
  ScaffolderPageContextMenu,
  TemplateCardProps,
  TemplateCategoryPicker,
  TemplateGroups,
} from '@backstage/plugin-scaffolder-react/alpha';
import { Box, Button, ButtonGroup, makeStyles } from '@material-ui/core';
import { CustomHeader } from '../../../../components/header/CustomHeader';
import { PlatformServicesCard } from '../../ZeldaTemplateCard';
import TemplateListHeader from './TemplateListHeader';

/**
 * @alpha
 */

const useStyles = makeStyles({
  searchBarInput: {
    width: '25%',
    marginBottom: 24,
    marginTop: 16,
  },
  content: {
    paddingTop: 0,
  },
  contentBox: {
    width: '100vw',
    maxWidth: '1200px',
    margin: '0 auto',
    fontSize: '16px',
  },
  container: {
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    fontSize: 16,
  },
  library: {
    paddingTop: '24px',
  },
  platformTemplatesListContainer: {
    marginTop: 48,
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '48px',
  },
});

export type TemplateListPageProps = {
  TemplateCardComponent?: React.ComponentType<{
    template: TemplateEntityV1beta3;
  }>;
  groups?: TemplateGroupFilter[];
  templateFilter?: (entity: TemplateEntityV1beta3) => boolean;
  contextMenu?: {
    editor?: boolean;
    actions?: boolean;
    tasks?: boolean;
  };
  headerOptions?: {
    pageTitleOverride?: string;
    title?: string;
    subtitle?: string;
    style?: React.CSSProperties;
  };
};

const templateFilter = (entity: TemplateEntityV1beta3) => {
  const entityType = entity.spec.type === 'service';
  console.log(`TemplateFilter outcome: ${entityType}`);
  return entityType;
};

const TemplateCardWrapper = (props: TemplateCardProps) => {
  console.log('TemplateCardWrapper invoked with props:', props);
  return <PlatformServicesCard {...props} />;
};

export const TemplateListPlatformProducts = () => {
  const { routes } = scaffolderPlugin;
  const navigate = useNavigate();
  const editorLink = useRouteRef(routes.edit);
  const actionsLink = useRouteRef(routes.actions);
  const tasksLink = useRouteRef(routes.listTasks);
  const templateRoute = useRouteRef(routes.selectedTemplate);

  const [platformTemplateGroups, setPlatformTemplateGroups] = useState<
    Entity[]
  >([]);

  const styles = useStyles();

  const scaffolderPageContextMenuProps = {
    onEditorClicked: () => navigate(editorLink()),
    onActionsClicked: () => navigate(actionsLink()),
    onTasksClicked: () => navigate(tasksLink()),
  };

  const onTemplateSelected = useCallback(
    (template: TemplateEntityV1beta3) => {
      const { namespace, name } = parseEntityRef(stringifyEntityRef(template));
      navigate(templateRoute({ namespace, templateName: name }));
    },
    [navigate, templateRoute],
  );

  const catalogApi = useApi(catalogApiRef);

  useAsync(async () => {
    const { items } = await catalogApi.getEntities({
      filter: {
        kind: 'Group',
        'spec.type': 'template-group',
        'relations.childOf': 'group:default/platform-services',
      },
    });
    setPlatformTemplateGroups(items);
  });

  const templateGroups: TemplateGroupFilter[] = platformTemplateGroups.map(
    (group): TemplateGroupFilter => ({
      title: (
        <TemplateListHeader
          title={group.metadata.title || 'i am undefined'}
          subtitle=""
        />
      ),
      filter: (entity: TemplateEntityV1beta3): boolean => {
        return (
          group.relations?.some(
            relation =>
              relation.type === 'parentOf' &&
              relation.targetRef === stringifyEntityRef(entity),
          ) || false
        );
      },
    }),
  );

  platformTemplateGroups.forEach(group => {
    console.log(
      `Group relations for ${group.metadata.title}:`,
      group.relations,
    );
  });

  // const templateGroups: TemplateGroupFilter[] = Array.from(tagsToMap).map(
  //   (tag): TemplateGroupFilter => ({
  //     title: (
  //       <TemplateListHeader title={capitalizeFirstLetter(tag)} subtitle="" />
  //     ),
  //     filter: (entity: TemplateEntityV1beta3): boolean => {
  //       return (
  //         entity.kind === 'Template' &&
  //         (entity.metadata?.tags?.includes(tag) ?? false)
  //       );
  //     },
  //   }),
  // );

  console.log('Template groups:', templateGroups);

  return (
    <EntityListProvider>
      <Page themeId="home">
        <CustomHeader
          title="Store"
          scaffolderPageContextMenu={
            <ScaffolderPageContextMenu {...scaffolderPageContextMenuProps} />
          }
        />
        <Content className={styles.content}>
          <Box className={styles.platformTemplatesListContainer}>
            <TemplateListHeader
              title="Platform Services"
              subtitle="Services for Streamlined Development"
            />
          </Box>
          <Box className={styles.buttonGroup}>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button>All</Button>
              <Button>Artifactory</Button>
              <Button>Sonarqube</Button>
              <Button>NPA</Button>
            </ButtonGroup>
          </Box>
          <CatalogFilterLayout>
            <Box style={{ display: 'none' }}>
              <CatalogFilterLayout.Filters>
                <EntityKindPicker initialFilter="template" hidden />
                <UserListPicker
                  initialFilter="all"
                  availableFilters={['all', 'starred']}
                />
                <TemplateCategoryPicker />
              </CatalogFilterLayout.Filters>
            </Box>
            <Box className={styles.container}>
              <TemplateGroups
                groups={templateGroups}
                templateFilter={entity => {
                  console.log('Template being passed to CardWrapper:', entity); // Debug log
                  return templateFilter(entity);
                }}
                TemplateCardComponent={TemplateCardWrapper}
                onTemplateSelected={onTemplateSelected}
              />
            </Box>
          </CatalogFilterLayout>
        </Content>
      </Page>
    </EntityListProvider>
  );
};
