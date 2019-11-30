<Text style={styles.myFont1}>Подрядчик</Text>
<Item disabled>
  <Input disabled
  placeholder={this.state.oldolddeal.employer.firstname+ ' '+ this.state.oldolddeal.employer.lastname}  />
</Item>
<Text style={styles.myFont1}>Заказчик</Text>
<Item disabled>
  <Input disabled
  placeholder={this.state.oldolddeal.employee.firstname+ ' '+ this.state.oldolddeal.employee.lastname}  />
</Item>

<Text style={styles.myFont1}>Описание работ</Text>
<Item disabled   >
  <Input disabled
  defaultValue={this.state.oldolddeal.workdescription}
  placeholder={this.state.olddeal.workdescription}  />
  {objKeys.includes("workdescription")? <IconNB name="md-create" />:<Text></Text>}
</Item>
<Text style={styles.myFont1}>Адрес объекта при проведении работ по ремонту</Text>
<Item disabled   >
  <Input disabled
  defaultValue={this.state.olddeal.workaddress}
  placeholder={this.state.olddeal.workaddress}  />
  {objKeys.includes("workdescription")? <IconNB name="md-create" />:<Text></Text>}
</Item>
<Text style={styles.myFont1}>Срок выполнения работ</Text>
<Item disabled   >
  <Input disabled

  placeholder={this.dateFormat(this.state.olddeal.workdeadline)}  />
  {objKeys.includes("workdescription")? <IconNB name="md-create" />:<Text></Text>}
</Item>
<Text style={styles.myFont1}>Цена работ</Text>
<Item disabled   >
  <Input disabled

  defaultValue={this.state.olddeal.workprice}
  placeholder={this.state.olddeal.workprice}  />
  {objKeys.includes("workdescription")? <IconNB name="md-create" />:<Text></Text>}
</Item>
<Text style={styles.myFont1}>Сроки и порядок оплаты</Text>
<Item disabled   >
  <Input disabled

  defaultValue={this.state.olddeal.payday}
  placeholder={this.state.olddeal.payday}  />
  {objKeys.includes("workdescription")? <IconNB name="md-create" />:<Text></Text>}
</Item>
<Text style={styles.myFont1}>Порядок приема работ</Text>
<Item disabled   >
  <Input disabled

  defaultValue={this.state.olddeal.workcheck}
  placeholder={this.state.olddeal.workcheck}  />
  {objKeys.includes("workdescription")? <IconNB name="md-create" />:<Text></Text>}
</Item>
<Text style={styles.myFont1}>Качество работ (гарантия качества работ)</Text>
<Item disabled   >
  <Input disabled

  defaultValue={this.state.olddeal.quantity}
  placeholder={this.state.olddeal.quantity}  />
  {objKeys.includes("workdescription")? <IconNB name="md-create" />:<Text></Text>}
</Item>
