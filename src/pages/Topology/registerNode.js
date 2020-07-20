// 使用第三方图形库
// 1.
import { registerNode, Node, Rect } from '@topology/core';

// 2. 导入图形库图形及其相关元素
import {
  flowData,
  flowDataAnchors,
  flowDataIconRect,
  flowDataTextRect,
  flowSubprocess,
  flowSubprocessIconRect,
  flowSubprocessTextRect,
  flowDb,
  flowDbIconRect,
  flowDbTextRect,
  flowDocument,
  flowDocumentAnchors,
  flowDocumentIconRect,
  flowDocumentTextRect,
  flowInternalStorage,
  flowInternalStorageIconRect,
  flowInternalStorageTextRect,
  flowExternStorage,
  flowExternStorageAnchors,
  flowExternStorageIconRect,
  flowExternStorageTextRect,
  flowQueue,
  flowQueueIconRect,
  flowQueueTextRect,
  flowManually,
  flowManuallyAnchors,
  flowManuallyIconRect,
  flowManuallyTextRect,
  flowDisplay,
  flowDisplayAnchors,
  flowDisplayIconRect,
  flowDisplayTextRect,
  flowParallel,
  flowParallelAnchors,
  flowComment,
  flowCommentAnchors,
} from '@topology/flow-diagram';

// 3. 向引擎注册图形库图形及其相关元素
registerNode(
  'flowData',
  flowData,
  flowDataAnchors,
  flowDataIconRect,
  flowDataTextRect,
);
registerNode(
  'flowSubprocess',
  flowSubprocess,
  null,
  flowSubprocessIconRect,
  flowSubprocessTextRect,
);
registerNode('flowDb', flowDb, null, flowDbIconRect, flowDbTextRect);
registerNode(
  'flowDocument',
  flowDocument,
  flowDocumentAnchors,
  flowDocumentIconRect,
  flowDocumentTextRect,
);

// 注册一个节点, 专门用来装背景图片
const bgNode = (ctx, node) => {
  ctx.beginPath();
  // console.log(ctx, node, 'bgNode');
};
const bgNodeAnchors = node => {
  // console.log(node, 'bgNodeAnchors');
};
const bgNodeIconRect = node => {
  // console.log(node, 'bgNodeIconRect');
  node.iconRect = node.rect;
  node.fullIconRect = node.rect;
};
const bgNodeTextRect = node => {
  // console.log(node, 'bgNodeTextRect');
  node.textRect = new Rect(
    node.rect.x + 10,
    node.rect.y + 10,
    node.rect.width - 20,
    40,
  );
  node.fullTextRect = new Rect(
    node.rect.x + 10,
    node.rect.y + 10,
    node.rect.width - 20,
    node.rect.height - 20,
  );
};
registerNode('bgNode', bgNode, bgNodeAnchors, bgNodeIconRect, bgNodeTextRect);

// 注册一个可以转动的图标子节点
registerNode(
  'deviceAnimateIcon',
  (ctx, node) => {
    ctx.beginPath();
  },
  () => {},
  node => {
    node.iconRect = node.rect;
    node.fullIconRect = node.rect;
  },
  () => {},
);
// 注册一个设备节点
registerNode(
  'device',
  (ctx, node) => {
    ctx.beginPath();
  },
  null,
  node => {
    node.iconRect = new Rect(
      node.rect.x,
      node.rect.y,
      node.rect.width,
      node.rect.height * 0.7,
    );
    node.fullIconRect = node.rect;
  },
  node => {
    node.textRect = new Rect(
      node.rect.x,
      node.rect.y + node.rect.height * 0.7,
      node.rect.width,
      node.rect.height * 0.3,
    );
    node.fullTextRect = node.rect;
  },
);

// 4. 初始化画布实例
// const canvas = new Topology('topology-canvas', canvasOptions)
// canvas.open({nodes:[], lines:[]})
export const Tools = [
  {
    group: 'basic',
    label: '基本形状',
    tools: [],
  },
  { name: 'bgNode', label: 'bgNode', icon: '/svg_icon/cam1_1.svg' },
  { name: 'device', label: 'cam5', icon: '/svg_icon/cam5_1.svg' },
  { name: 'device', label: 'fun4', icon: '/svg_icon/cam1_3.svg' },
  {
    name: 'device',
    label: 'device',
    icon: '/svg_icon/fun4.svg',
    children: [
      {
        name: 'deviceAnimateIcon',
        image: '/svg_icon/fun4.svg',
        lineWidth: 0,
        strokeStyle: 'rgba(0,0,0,0)',
        fillStyle: 'rgba(0,0,0,0)',
        stand: false,
        locked: 2,
        rectInParent: {
          x: 0,
          y: 0,
          width: '100%',
          height: '70%' || '100%',
        },
        // animateDuration: 2000,
        // animateFrames: [
        //   {
        //     duration: 2000,
        //     linear: true,
        //     state: { rotate: 360 }
        //   },
        //   {
        //     duration: 0,
        //     linear: true,
        //     state: { rotate: 0 }
        //   }
        // ],
      },
    ],
  },
];
