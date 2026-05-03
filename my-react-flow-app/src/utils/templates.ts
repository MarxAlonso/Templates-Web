export const getTemplateNodesAndEdges = (templateId: string, startPos: {x: number, y: number}) => {
  const nodes = [];
  const edges = [];
  const idPrefix = `tpl_${Date.now()}`;

  if (templateId === 'web-arch') {
    const dbId = `${idPrefix}_db`;
    const serverId = `${idPrefix}_server`;
    const frontendId = `${idPrefix}_frontend`;
    
    nodes.push({
      id: frontendId,
      type: 'archNode',
      position: { x: startPos.x, y: startPos.y },
      data: { label: 'Web Frontend', iconType: 'web', color: '#3b82f6', description: 'React SPA / Bootstrap UI' }
    });
    
    nodes.push({
      id: serverId,
      type: 'archNode',
      position: { x: startPos.x + 250, y: startPos.y },
      data: { label: 'API Gateway / Backend', iconType: 'server', color: '#f59e0b', description: 'Spring Boot REST API' }
    });
    
    nodes.push({
      id: dbId,
      type: 'archNode',
      position: { x: startPos.x + 500, y: startPos.y },
      data: { label: 'MySQL Database', iconType: 'database', color: '#10b981', description: 'Citas, Médicos, Pacientes' }
    });
    
    edges.push({ id: `e_${frontendId}-${serverId}`, source: frontendId, target: serverId, animated: true });
    edges.push({ id: `e_${serverId}-${dbId}`, source: serverId, target: dbId, animated: true });
  } 
  else if (templateId === 'monolith-full') {
    const controllerId = `${idPrefix}_ctrl`;
    const serviceId = `${idPrefix}_svc`;
    const repoId = `${idPrefix}_repo`;
    const dbId = `${idPrefix}_db`;
    
    nodes.push({
      id: controllerId,
      type: 'archNode',
      position: { x: startPos.x, y: startPos.y },
      data: { label: 'Controllers (REST)', iconType: 'api', color: '#3b82f6', description: 'Account, Citas, Medicos' }
    });
    
    nodes.push({
      id: serviceId,
      type: 'archNode',
      position: { x: startPos.x, y: startPos.y + 120 },
      data: { label: 'Services (Logic)', iconType: 'server', color: '#f59e0b', description: 'Business Logic & Rules' }
    });
    
    nodes.push({
      id: repoId,
      type: 'archNode',
      position: { x: startPos.x, y: startPos.y + 240 },
      data: { label: 'Repositories (JPA)', iconType: 'cloud', color: '#8b5cf6', description: 'Data Access Layer' }
    });
    
    nodes.push({
      id: dbId,
      type: 'archNode',
      position: { x: startPos.x + 250, y: startPos.y + 240 },
      data: { label: 'MySQL Database', iconType: 'database', color: '#10b981', description: 'Persistence' }
    });
    
    edges.push({ id: `e_${controllerId}-${serviceId}`, source: controllerId, target: serviceId });
    edges.push({ id: `e_${serviceId}-${repoId}`, source: serviceId, target: repoId });
    edges.push({ id: `e_${repoId}-${dbId}`, source: repoId, target: dbId });
  }
  else if (templateId === 'test-pyramid') {
    const uiId = `${idPrefix}_ui`;
    const apiId = `${idPrefix}_api`;
    const intId = `${idPrefix}_int`;
    const unitId = `${idPrefix}_unit`;
    
    nodes.push({
      id: uiId,
      type: 'archNode',
      position: { x: startPos.x + 100, y: startPos.y },
      data: { label: 'Pruebas de UI (Manual/E2E)', iconType: 'ui', color: '#10b981', description: 'Cima: Menor cantidad' }
    });
    
    nodes.push({
      id: apiId,
      type: 'archNode',
      position: { x: startPos.x + 75, y: startPos.y + 100 },
      data: { label: 'Pruebas Funcionales (API)', iconType: 'api', color: '#3b82f6', description: 'Medio-Alto' }
    });
    
    nodes.push({
      id: intId,
      type: 'archNode',
      position: { x: startPos.x + 50, y: startPos.y + 200 },
      data: { label: 'Pruebas de Integración', iconType: 'integration', color: '#8b5cf6', description: 'Medio-Bajo' }
    });
    
    nodes.push({
      id: unitId,
      type: 'archNode',
      position: { x: startPos.x + 25, y: startPos.y + 300 },
      data: { label: 'Pruebas Unitarias', iconType: 'unit', color: '#ec4899', description: 'Base: Mayor cobertura' }
    });
  }
  else if (templateId === 'cicd-full') {
    const commitId = `${idPrefix}_commit`;
    const buildId = `${idPrefix}_build`;
    const testId = `${idPrefix}_test`;
    const deployId = `${idPrefix}_deploy`;
    
    nodes.push({
      id: commitId,
      type: 'archNode',
      position: { x: startPos.x, y: startPos.y },
      data: { label: 'GitHub Push', iconType: 'commit', color: '#64748b', description: 'Trigger Pipeline' }
    });
    
    nodes.push({
      id: buildId,
      type: 'archNode',
      position: { x: startPos.x + 200, y: startPos.y },
      data: { label: 'MVN Build', iconType: 'build', color: '#f59e0b', description: 'Compile & Package' }
    });
    
    nodes.push({
      id: testId,
      type: 'archNode',
      position: { x: startPos.x + 400, y: startPos.y },
      data: { label: 'Automated Tests', iconType: 'unit', color: '#10b981', description: 'Unit & Integration' }
    });
    
    nodes.push({
      id: deployId,
      type: 'archNode',
      position: { x: startPos.x + 600, y: startPos.y },
      data: { label: 'Deploy to Prod', iconType: 'deploy', color: '#ef4444', description: 'Cloud / Server' }
    });
    
    edges.push({ id: `e_${commitId}-${buildId}`, source: commitId, target: buildId, animated: true });
    edges.push({ id: `e_${buildId}-${testId}`, source: buildId, target: testId, animated: true });
    edges.push({ id: `e_${testId}-${deployId}`, source: testId, target: deployId, animated: true });
  }

  return { nodes, edges };
};
