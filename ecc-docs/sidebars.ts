import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '🎓 交互式教程',
      items: [
        'tutorials/index',
        'tutorials/hello-ecc',
        'tutorials/tdd-masterclass',
        'tutorials/multi-agent-workflow',
        'tutorials/custom-hooks',
        'tutorials/e2e-testing',
      ],
    },
    {
      type: 'category',
      label: '🚀 快速开始',
      items: [
        'quick-start/index',
        'quick-start/installation',
        'quick-start/first-command',
      ],
    },
    {
      type: 'category',
      label: '📚 核心概念',
      items: [
        'core-concepts/agents',
        'core-concepts/commands',
        'core-concepts/skills',
        'core-concepts/hooks',
        'core-concepts/rules',
      ],
    },
    {
      type: 'category',
      label: '🛠️ 实战指南',
      items: [
        'guides/typescript',
        'guides/python',
        'guides/golang',
      ],
    },
    {
      type: 'category',
      label: '🚀 高级主题',
      items: [
        'advanced/multi-agent',
        'advanced/performance',
        'advanced/troubleshooting',
      ],
    },
  ],
};

export default sidebars;
