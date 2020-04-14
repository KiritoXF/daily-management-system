<template>
  <div class="index">
    <div style="text-align: center;">
      <h1>
        <p>{{$t("welcomeMessage")}}</p>
      </h1>
    </div>
    <Row style="padding: 50px 100px">
      <Col span="12">
      <Card style="width: 600px; padding: 10px;">
        <h3 slot="title">{{ $t("introduce") }}</h3>
        <Dropdown slot="extra" trigger="click" style="margin-left: 20px;">
          <Button shape="circle" icon="md-more"></Button>
          <DropdownMenu slot="list">
            <DropdownItem>operate1</DropdownItem>
            <DropdownItem>operate2</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <h2>{{ $t("introduce.welcomeMessage") }}</h2>
        <p style="padding: 20px 0">
          {{ $t("introduce.checkForNew") }}
          <a href="https://github.com/KiritoXF/Daily_Management_System/wiki" target="_blank">{{ $t("guide") }}</a>
        </p>
      </Card>
      <Card style="width: 600px; padding: 10px; margin: 10px 0">
        <h3 slot="title">{{ $t("navigation") }}</h3>
        <a href="https://segmentfault.com/" target="_blank">
          <img src="../images/sifou.png" size="36">
        </a>
        <a href="https://juejin.im/" target="_blank">
          <img src="../images/juejin.png" size="36">
        </a>
        <a href="https://www.v2ex.com/" target="_blank">
          <img src="../images/v2ex.png" size="36">
        </a>
        <a href="https://github.com/" target="_blank">
          <img src="../images/github.png" size="36">
        </a>
      </Card>
      </Col>
      <Col span="12">
      <Card style="width: 500px">
        <p slot="title">{{ $t("weekDailyInfo") }}</p>
        <CellGroup>
          <Cell :title="$t('personalDaily')" to="/mydaily" />
          <Cell :title="$t('teamDaily')" :disabled="true" /> <!-- to="/" can't be added if it's disabled. -->
          <hr />
          <Cell :title="$t('dailyManagement')" :disabled="true" />
        </CellGroup>
      </Card>

      <Card style="width: 500px; margin: 50px 0">
        <p slot="title">{{ $t("toBeDone") }}</p>
        <p>{{ $t("noTodoNow") }}</p>
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