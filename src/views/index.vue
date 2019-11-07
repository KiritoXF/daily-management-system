<template>
  <div class="index">
    <div style="text-align: center;">
      <h1>
        <p>Welcome Page</p>
      </h1>
    </div>
    <Row style="padding: 50px 100px">
      <Col span="12">
        <Card style="width: 600px;">
          <h3 slot="title">介绍</h3>
          <Dropdown slot="extra" trigger="click" style="margin-left: 20px">
            <Button shape="circle" icon="md-more"></Button>
            <DropdownMenu slot="list">
              <DropdownItem>operate1</DropdownItem>
              <DropdownItem>operate2</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <h2>Welcome to daily management system</h2>
          <p style="padding: 20px 0">
            New here? Check the
            <a href="https://github.com/KiritoXF/Daily_Management_System/wiki" target="_blank">Guide</a> (not finished yet)
          </p>
        </Card>
      </Col>
      <Col span="12">
        <Card style="width: 500px">
          <p slot="title">周报信息</p>
          <Cell title="个人周报" to="/mydaily" />
          <Cell title="团队周报" :disabled="true" to="/" />
          <hr />
          <Cell title="周报管理" :disabled="true" />
        </Card>

        <Card style="width: 500px; margin: 50px 0">
          <p slot="title">待处理</p>
          <p>目前没有待处理的任务</p>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  methods: {}
};
</script>
