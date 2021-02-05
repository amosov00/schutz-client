<template>
	<div class="s-modal">
		<div class="s-modal__scroll">
			<div v-if="$i18n.locale === 'ru'" class="s-modal____content terms">
				<div class="terms__title">Условия и положения</div>
				<div class="terms__date">«4» февраля 2021 г.</div>
				<div class="terms__body">
					<p>
						SCHUTZ именуемый в дальнейшем «Управляющий», с одной стороны, и
						пользователь математического кода «{{ user.ethereum_wallet }}»,
						именуемый в дальнейшем «Инвестор», с другой стороны, совместно
						именуемые в дальнейшем «Стороны», заключили настоящее Соглашение о
						нижеследующем:
					</p>

					<div class="page__list">
						<div class="page__list_item" data-number="1">
							ПРЕДМЕТ СОГЛАШЕНИЯ
						</div>
						<div class="page__list_item" data-number="1.1">
							Управляющий обязуется принять в управление цифровые активы и
							управлять ими в течение срока действия настоящего вклада.
						</div>
						<div class="page__list_item" data-number="1.2">
							Технологией по приему и выдачи цифровых активов выступает
							централизованный смарт-контракт на базе блокчейна Эфириум
							(Ethereum) Schutz. Данный смарт-контракт не влияет на получение
							прибыли Управляющим, а лишь является автоматизированной платформой
							- электронным бухгалтером SCHUTZ.
						</div>
						<div class="page__list_item" data-number="1.3">
							Управляющий обязуется совершать спекулятивные операции на биржевом
							рынке в интересах прибыли Инвестора от колебаний курсов,
							Управляющий имеет право на свое усмотрение выбирать сделки для
							извлечения прибыли.
						</div>
						<div class="page__list_item" data-number="1.4">
							Расчетный период определяется условиями тарифного плана.
						</div>
						<div class="page__list_item" data-number="1.5">
							Заключение Соглашения между Управляющим и Инвестором, вместе
							именуемыми – «Стороны», осуществляется путем полного и
							безоговорочного присоединения Клиента к Соглашению (акцепта
							Соглашения).
						</div>
						<div class="page__list_item" data-number="1.6">
							1.6 В рамках настоящего Соглашения допускается внесение цифровых
							токенов на криптовалютный кошелек Управляющего. Возврат объектов
							управления или процентов по ним осуществляются в цифровых токенах.
							Передача цифровых активов в управление не влечет перехода права
							собственности на них к Управляющему.
						</div>
						<div class="page__list_item" data-number="1.7">
							1.7 Передача в доверительное управление цифровых активов
							осуществляется Инвестором путем перечисления цифровых активов на
							кошелек Управляющего. Днем передачи цифровых активов Инвестора в
							доверительное управление считается день их поступления на
							смарт-контракт Schutz.
						</div>
						<div class="page__list_item" data-number="1.8">
							1.8 Начисление процентов на суммы, переданные в управление средств
							(«тела депозита») происходит за каждый квартал (первый квартал
							15-20 апреля, второй квартал 15-20 июля, третий квартал 15-20
							октября, четвертый квартал 15-20 января), за исключением выходных
							и праздничных дней.
						</div>
						<div class="page__list_item" data-number="1.9">
							Выгодоприобретателем по Договору является Инвестор.
						</div>
						<div class="page__list_item" data-number="2">
							ПРАВА И ОБЯЗАННОСТИ СТОРОН
						</div>
						<div class="page__list_item" data-number="2.1">
							Права и обязанности Управляющего:
						</div>
						<div class="page__list_item" data-number="2.1.1">
							Инвестор обязан принять условия тарифного плана, описанные в
							данном Соглашении, а также «Ограничение ответственности».
						</div>
						<div class="page__list_item" data-number="2.1.2">
							В случае наступления форс-мажорных обстоятельств Управляющий
							вправе менять (повышать или снижать) процент прибыли, заявленный
							согласно тарифному плану, уведомив другую Сторону в срок не менее,
							чем за 30 календарных дней.
						</div>
						<div class="page__list_item" data-number="2.1.3">
							Управляющий вправе изменять данное «Соглашение», а также
							«Ограничение ответственности» без обязательства уведомления
							Инвестора о внесенных изменениях в вышеупомянутые документы.
						</div>
						<div class="page__list_item" data-number="2.1.4">
							Управляющий обязуется уведомлять Инвестора о начислении
							ежеквартальных дивидендов, завершении работы тела депозита
							посредством e-mail уведомления.
						</div>
						<div class="page__list_item" data-number="2.2">
							Права и обязанности Инвестора:
						</div>
						<div class="page__list_item" data-number="2.2.1">
							Инвестор обязан принять условия тарифного плана, описанные в
							данном Соглашении, а также «Ограничение ответственности».
							<a
								:href="
									require('~/static/files/Ogranicheniye_otvetstvennosti.pdf')
								"
								rel="noopener noreferrer"
								target="_blank"
							>
								«Ограничение ответственности».
							</a>
						</div>
						<div class="page__list_item" data-number="2.2.2">
							Инвестор не в праве вмешиваться в деятельность управляющего по
							управлению активами.
						</div>
						<div class="page__list_item" data-number="2.2.3">
							Инвестор обязуется зафиксировать полученную прибыль путем вывода
							или реинвестирования всего объема средств в период не позднее чем
							3 календарных года с даты открытого депозита. В противном случае
							итоговый баланс (итоговая сумма депозита и ежеквартальных выплат)
							будет списан со счета Инвестора в пользу Управляющего.
						</div>
						<div class="page__list_item" data-number="2.2.4">
							По истечению срока работы вклада Инвестор обязуется подать заявку
							на вывод/пролонгацию тела депозита посредством нажатия на кнопки
							«Вывести/пролонгировать депозит» заблаговременно, до конца месяца,
							после которого планируется вывод/пролонгация. В противном случае
							Управляющий перенесет вывод/ пролонгацию тела депозита Инвестора
							на 1 месяц позднее предусмотренного тарифным планом. <br />Пример:
							вывод тела депозита по тарифному плану назначен на 20-22 марта
							2021 г., Инвестору необходимо подать заявку на вывод/пролонгацию
							до конца февраля 2021. Если Инвестор просрочил подачу заявки, то в
							марте 2021 отправляется повторное e-mail уведомление и в случае
							отправки заявки до конца марта, Управляющий произведет начисление
							/ пролонгацию 20-22 апреля 2021.
						</div>
						<div class="page__list_item" data-number="2.2.5">
							Инвестор имеет право пополнять депозит, а также реинвестировать
							полученные ежеквартальные проценты на протяжении всего срока
							работы депозита (12 мес.). В этом случае изначальная сумма
							депозита будет увеличена на сумму пополнения и/или
							реинвестированных средств. При этом сумма выплат по следующим
							отчетным периодам (кварталам) увеличится соответственно. Вывод
							итоговой суммы депозита будет произведен по первоначальной дате
							открытия депозита.
						</div>
						<div class="page__list_item" data-number="2.2.6">
							<strong>Изменение платежных реквизитов Инвестора.</strong>
							В случае потери Инвестором доступа к кошельку (математическому
							коду), который привязан к личному кабинету и с которого был открыт
							депозит, Инвестору необходимо уведомить службу поддержки SCHUTZ
							через e-mail обращение. Управляющий предложит Инвестору процедуру
							восстановления доступа к депозиту.
						</div>
						<div class="page__list_item" data-number="2.2.7">
							Инвестор несет ответственность за уплату всех налоговых
							обязательств (налог на доходы физических лиц), Инвестор обязан
							исполнять (исчислять и уплачивать) все выплаты самостоятельно.
							Ответственность за неисполнение (ненадлежащее исполнение)
							налоговых обязательств Инвестор несет самостоятельно.
						</div>
						<div class="page__list_item" data-number="2.2.8">
							Инвестор подтверждает, что он уведомлен о возможных рисках по
							ведению спекулятивных сделок с цифровыми активами.
						</div>

						<div class="page__list_item" data-number="3">
							СРОК ДЕЙСТВИЯ СОГЛАШЕНИЯ
						</div>
						<div class="page__list_item" data-number="3.1">
							Цифровые активы Инвестора должны быть перечислены на кошелек
							Управляющего в срок не более 1 (одного) календарного дня с момента
							подписания настоящего Соглашения. Настоящее Соглашение вступает в
							силу с момента завершения транзакции согласно условиям тарифного
							плана и действует до момента его расторжения.
						</div>
						<div class="page__list_item" data-number="3.2">
							Расторжение настоящего Соглашения возможно только по окончании
							срока действия депозита. Управляющий вправе в одностороннем
							порядке досрочно расторгнуть настоящее Соглашение, предупредив об
							этом другую Сторону не менее, чем за 5 (пять) рабочих дней до
							завершения очередного расчетного периода посредством e-mail
							уведомления.
						</div>
						<div class="page__list_item" data-number="3.3">
							По заявлению Управляющим настоящее Соглашение может быть
							расторгнуто в одностороннем порядке в случае наступления
							<a
								:href="
									require('~/static/files/Ogranicheniye_otvetstvennosti.pdf')
								"
								rel="noopener noreferrer"
								target="_blank"
							>
								обстоятельств непреодолимой силы (форс-мажор), повлиявших на
								возможность исполнения настоящего Соглашения. </a
							>. При этом, Сторона, ссылающаяся на обстоятельства непреодолимой
							силы в качестве основания для расторжения настоящего Соглашения,
							должна представить другой Стороне полученные из компетентных
							органов доказательства наступления обстоятельств непреодолимой
							силы и степень их влияния на невозможность исполнения настоящего
							Соглашения, например: <br />
							- издание нормативных актов, положения которых обуславливают
							невозможность надлежащего исполнения обязательств; <br />
							- возникновение стихийных бедствий, в том числе наводнений,
							землетрясений, пожаров и др.; <br />
							- влияние социально-политических факторов, в том числе забастовок,
							митингов, шествий, действий органов власти, военных действий или
							конфликтов, террористических актов; <br />
							- прекращение (приостановление) деятельности организаторов торгов;
							<br />
							- невыплата онлайн-биржами
							<a
								href="https://poloniex.com"
								rel="noopener noreferrer"
								target="_blank"
							>
								https://poloniex.com
							</a>
							<a
								href="https://www.binance.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://www.binance.com</a
							>
							<a
								href="https://bitmex.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://bitmex.com</a
							>
							<a
								href="https://bitfinex.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://bitfinex.com</a
							>
							<a
								href="https://bittrex.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://bittrex.com</a
							>
							<a
								href="https://hitbtc.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://hitbtc.com</a
							>
							<a
								href="https://www.okex.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://www.okex.com</a
							>
							<a
								href="https://www.hbg.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://www.hbg.com</a
							>
							<a
								href="https://lykke.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://lykke.com</a
							>
							<a
								href="https://uniswap.org"
								rel="noopener noreferrer"
								target="_blank"
								>https://uniswap.org</a
							>
							причитающихся платежей, осуществление несвоевременных выплат или
							иные действия, не поддающиеся контролю со стороны Управляющего.
							<br />
							- Атака мошенниками на аккаунты управляющего и хищение ими
							средств. (Полный список пунктов содержит документ
							<a
								:href="
									require('~/static/files/Ogranicheniye_otvetstvennosti.pdf')
								"
								target="_blank"
							>
								«Ограничение отвественности»
							</a>
							)
						</div>
						<div class="page__list_item" data-number="3.4">
							Настоящее Соглашение также может быть расторгнуто по взаимному
							соглашению Сторон.
						</div>
						<div class="page__list_item" data-number="4">
							ОТВЕТСТВЕННОСТЬ СТОРОН
						</div>
						<div class="page__list_item" data-number="">
							Предлагаемые цифровые финансовые активы являются
							высокорискованными, и их приобретение может привести к потере
							внесенных денежных средств в полном объеме. До совершения сделок с
							предлагаемыми цифровыми финансовыми активами следует ознакомиться
							с рисками, с которыми связано их приобретение.
						</div>
						<div class="page__list_item" data-number="4.1">
							Заключая настоящее Соглашение, Инвестор уведомлен об имущественных
							рисках, связанных с досрочным выводом цифровых активов.
						</div>
						<div class="page__list_item" data-number="4.2">
							Управляющий или Инвестор не будет нести ответственность за
							неисполнение или ненадлежащее исполнение обязательств по Договору,
							если это будет являться следствием обстоятельств непреодолимой
							силы (форс-мажор), указанных в данном Договоре (Форс-мажорные
							обстоятельства), или следствием неисполнения или ненадлежащего
							исполнения обязательств по Договору другой Стороной.
						</div>
						<div class="page__list_item" data-number="4.3">
							Инвестор заверяет Управляющего в том, что принимает на себя все
							независящие от воли Управляющего риски, связанные с непреодолимыми
							обстоятельствами (форс-мажор), которые не зависят от действий
							Управляющего и на которые Управляющий не может повлиять каким-либо
							образом.
						</div>
						<div class="page__list_item" data-number="4.4">
							Инвестор подтверждает, что имеет базовые знания о цифровых активах
							и возможных видах их торговли на рынке. Инвестор подтверждает, что
							передает цифровые активы в управление с осознанием того, что
							Управляющий будет совершать спекулятивные сделки на рынке цифровых
							активов с целью извлечения прибыли для Инвестора.
						</div>
						<div class="page__list_item" data-number="4.5">
							В случае введения соответствующих требований по регулированию
							криптовалют в стране, резидентом которой является Инвестор, он
							должен пройти все необходимые страной требования, чтобы иметь
							возможность продолжить работу с Управляющим.
						</div>
						<div class="page__list_item" data-number="4.6">
							Все переводы цифровых активов с кошелька Инвестора происходят в
							стейблкоинах исключительно для точного расчета в тарифах по курсу
							на онлайн-бирже
							<a
								href="https://www.binance.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://www.binance.com</a
							>
							на момент поступления средств на смарт-контракт
						</div>
						<div class="page__list_item" data-number="5">
							КОНФИДЕНЦИАЛЬНОСТЬ:
						</div>
						<div class="page__list_item" data-number="5.1">
							Ни одна из Сторон Договора не имеет права, кроме как по требованию
							компетентного органа или суда, в течение срока действия и после
							прекращения действия Договора в течение 3 (трех) лет, разглашать
							какому- либо лицу, не уполномоченному одной из Сторон, информацию,
							относящуюся к Договору, за исключением информации, которая может
							быть получена из общедоступных источников.
						</div>
						<div class="page__list_item" data-number="5.2">
							Инвестор дает свое согласие на предоставление своих персональных
							данных указанным лицам Управляющего и уведомлен о своем праве в
							любое время отозвать свое согласие на обработку персональных
							данных.
						</div>
						<div class="page__list_item" data-number="6">
							ПОРЯДОК РАЗРЕШЕНИЯ СПОРОВ
						</div>
						<div class="page__list_item" data-number="6.1">
							Споры и разногласия, которые могут возникнуть при исполнении
							настоящего Соглашения, будут по возможности разрешаться путем
							переговоров между Сторонами.
						</div>
						<div class="page__list_item" data-number="7">
							ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ
						</div>
						<div class="page__list_item" data-number="7.1">
							Стороны признают юридическую силу настоящего Соглашения.
						</div>
						<div class="page__list_item" data-number="7.2">
							Заполняя настоящее соглашение инвестор соглашается с обработкой
							своих персональных данных Управляющим.
						</div>
					</div>
				</div>
			</div>

			<div v-else class="s-modal____content terms">
				<div class="terms__title">Terms and Conditions</div>
				<div class="terms__date">4 February 2021</div>
				<div class="terms__body">
					<p>
						SCHUTZ hereinafter referred to as "Manager", on the one hand, and
						the user of the mathematical code «{{ user.ethereum_wallet }}»,
						hereinafter referred to as the "Investor", on the other hand,
						collectively hereinafter referred to as the «Parties", have entered
						into this Agreement as follows:
					</p>

					<div class="page__list">
						<div class="page__list_item" data-number="1">
							SUBJECT OF THE AGREEMENT
						</div>
						<div class="page__list_item" data-number="1.1">
							The manager undertakes to accept and manage digital assets during
							the period of validity present contribution.
						</div>
						<div class="page__list_item" data-number="1.2">
							The technology for receiving and issuing digital assets is a
							centralized smart contract Schutz, based on blockchain Ethereum.
							This smart contract does not affect the receipt of profit by the
							Manager, but it is only an automated platform - the electronic
							accountant.
						</div>
						<div class="page__list_item" data-number="1.3">
							The Manager undertakes to perform speculative transactions on the
							exchange market in the interests of the Investor's profit from
							fluctuations in rates. The Manager has the right, at his ow
							discretion, to choose transactions for making a profit.
						</div>
						<div class="page__list_item" data-number="1.4">
							The billing period is determined by the terms of the tariff plan.
						</div>
						<div class="page__list_item" data-number="1.5">
							The conclusion of the Agreement between the Manager and the
							Investor, collectively referred to as the "Parties", is carried
							out by full and unconditional accession of the Client to the
							Agreement (acceptance of the Agreement).
						</div>
						<div class="page__list_item" data-number="1.6">
							Within the framework of this Agreement, it is allowed to deposit
							digital tokens to the Manager’s cryptocurrency wallet. The return
							of management objects or interest on them is carried out in
							digital tokens. The transfer of digital assets for management does
							not entail the transfer of ownership of them to the Manager.
						</div>
						<div class="page__list_item" data-number="1.7">
							The transfer of digital assets into trust is carried out by the
							Investor by transferring digital assets to the Manager's wallet.
							The day transfer of the Investor's digital assets into the trust
							management is considered the day of their receipt on the Schutz
							smart contract.
						</div>
						<div class="page__list_item" data-number="1.8">
							Accrued interest on the amount of funds transferred to management
							("deposit body") occurs for each quarter (first quarter April
							15-20, second quarter July 15-20, third quarter October 15-20,
							fourth quarter 15-20 January), excluding weekends and holidays.
						</div>
						<div class="page__list_item" data-number="1.9">
							The Beneficiary under the Agreement is the Investor.
						</div>
						<div class="page__list_item" data-number="2">
							RIGHTS AND OBLIGATIONS OF THE PARTIES
						</div>
						<div class="page__list_item" data-number="2.1">
							Rights and obligations of the Manager:
						</div>
						<div class="page__list_item" data-number="2.1.1">
							Use the funds transferred by the Investor for management solely
							for the purpose of obtaining for the benefit an investor of
							speculative profit, managing funds by performing purchase and sale
							transactions on the exchange market with target profitability
							according to the terms of the tariff plan. Act in good faith and
							in the manner which is best for the interests of the Investor.
						</div>
						<div class="page__list_item" data-number="2.1.2">
							In the event of force majeure circumstances, the Manager has the
							right to change (increase or decrease) percentage of profit
							declared according to the tariff plan, notifying the other Party
							in a period of at least 30 calendar days.
						</div>
						<div class="page__list_item" data-number="2.1.3">
							The manager has the right to change this "Agreement", as well as
							the "Limitation of Liability" without obligation to notifying the
							Investor about the changes made to the above documents.
						</div>
						<div class="page__list_item" data-number="2.1.4">
							The Manager undertakes to notify the Investor about the accrual of
							quarterly dividends, completion of work body of the deposit via
							e-mail notification.
						</div>
						<div class="page__list_item" data-number="2.2">
							Investor's rights and obligations:
						</div>
						<div class="page__list_item" data-number="2.2.1">
							The investor is obliged to accept the terms of the tariff plan
							described in this "Agreement", as well as the
							<a
								:href="require('~/static/files/Limitation_of_liability.pdf')"
								rel="noopener noreferrer"
								target="_blank"
							>
								"Limitation of Liability"
							</a>
						</div>
						<div class="page__list_item" data-number="2.2.2">
							The investor has no right to interfere with the activities of the
							asset trust manager.
						</div>
						<div class="page__list_item" data-number="2.2.3">
							The investor undertakes to fix the received profit by withdrawing
							or reinvesting the entire volume funds within a period not later
							than 3 calendar years from the date of the open deposit.
							Otherwise, the final balance (the total amount of the deposit and
							quarterly payments) will be debited from the Investor's account in
							favor of the Manager.
						</div>
						<div class="page__list_item" data-number="2.2.4">
							Upon the expiration of the term of the deposit, the Investor
							undertakes to apply for the withdrawal / prolongation of the body
							of the deposit by clicking on the "Withdraw / prolong the deposit"
							button in advance, before the end of the month, after which is
							planned to be withdrawn / extended. Otherwise, the Manager will
							transfer the withdrawal / prolongation of the body the Investor's
							deposit 1 month later than provided for by the tariff plan.<br />
							Example: withdrawing the body of the deposit by the tariff plan is
							scheduled for March 20-22, 2021, the Investor must submit an
							application for withdrawal / prolongation until the end of
							February 2021. If the Investor is late in filing an application,
							then in March 2021 the second e-mail notification is sent and if
							the application is sent by the end of March, the Manager will
							accrue / prolongate by 20-22 of April, 2021.
						</div>
						<div class="page__list_item" data-number="2.2.5">
							The investor has the right to replenish the deposit, as well as
							reinvest the received quarterly interest on throughout the entire
							term of the deposit (12 months). In this case, the initial amount
							of the deposit will be increased by the amount of replenishment
							and / or reinvested funds. At the same time, the amount of
							payments for the following reporting periods (quarters) will
							increase accordingly. The withdrawal of the total amount of the
							deposit will be made at the initial the date of opening the
							deposit.
						</div>
						<div class="page__list_item" data-number="2.2.6">
							Change of payment details In. If the Investor loses access to the
							wallet (mathematical code), which is tied to the personal account
							and from which the deposit was opened, the Investor must notify
							SCHUTZ support service via e-mail address. The Manager will offer
							the Investor the procedure for restoring of access to the deposit.
						</div>

						<div class="page__list_item" data-number="2.2.7">
							The investor is responsible for paying all tax liabilities
							(personal income tax), the investor is obliged to fulfill
							(calculate and pay) all payments independently. Responsibility for
							non-fulfillment (improper fulfillment) of tax obligations the
							Investor bears independently.
						</div>
						<div class="page__list_item" data-number="2.2.8">
							The investor confirms that he is aware of the possible risks of
							speculative transactions with digital assets.
						</div>

						<div class="page__list_item" data-number="3">
							DURATION OF THE AGREEMENT
						</div>
						<div class="page__list_item" data-number="3.1">
							The Investor's digital assets must be transferred to the Manager's
							wallet within a period not exceeding 1 (one) calendar day from the
							date of signing this Agreement. This Agreement shall enter into
							force from the moment of the transaction in accordance with the
							terms of the tariff plan and is valid until its termination.
						</div>
						<div class="page__list_item" data-number="3.2">
							Termination of this Agreement is possible only at the end of the
							term of the deposit. Manager has the right to unilaterally
							terminate this Agreement ahead of schedule, notifying the other
							the party no less than 5 (five) business days before the end of
							the next billing period by email notifications.
						</div>
						<div class="page__list_item" data-number="3.3">
							At the request of the Managers, this Agreement may be terminated
							unilaterally in the event of the occurrence of force majeure
							circumstances (force majeure) that affected the possibility of
							execution of the present agreement. In this case, the Party
							referring to force majeure circumstances as grounds for
							termination of this Agreement, must provide the other Party the
							evidence obtained from the competent authorities of the occurrence
							of force majeure and the degree of their influence on
							impossibility of execution of this Agreement, for example:<br />
							- the publication of regulations, the provisions of which cause
							the impossibility of proper performance of obligations;<br />
							- occurrence of natural disasters, including the number of floods,
							earthquakes, fires, etc .;<br />
							- the influence of socio-political factors, including strikes,
							rallies, marches, government actions, military actions or
							conflicts, terrorist acts;<br />
							- termination (suspension) of the activities of auction
							organizers;<br />
							- non-payment by online exchanges
							<a
								href="https://poloniex.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://poloniex.com
							</a>
							<a
								href="https://www.binance.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://www.binance.com</a
							>
							<a
								href="https://bitmex.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://bitmex.com</a
							>
							<a
								href="https://bitfinex.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://bitfinex.com</a
							>
							<a
								href="https://bittrex.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://bittrex.com</a
							>
							<a
								href="https://hitbtc.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://hitbtc.com
							</a>
							<a
								href="https://www.okex.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://www.okex.com</a
							>
							<a
								href="https://www.hbg.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://www.hbg.com</a
							>
							<a
								href="https://lykke.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://lykke.com</a
							>
							<a
								href="https://uniswap.org/"
								rel="noopener noreferrer"
								target="_blank"
								>https://uniswap.org/</a
							>
							payments due, making late payments or other actions that cannot be
							control by the Manager;<br />
							- attack by fraudsters on manager accounts and theft of funds.
							(The complete list of items contains the document
							<a
								:href="require('~/static/files/Limitation_of_liability.pdf')"
								target="_blank"
								>"Disclaimer"</a
							>)
						</div>
						<div class="page__list_item" data-number="3.4">
							This Agreement can also be terminated by mutual agreement of the
							Parties.
						</div>
						<div class="page__list_item" data-number="4">
							LIABILITY OF THE PARTIES
						</div>

						<div class="page__list_item" data-number="">
							The offered digital financial assets are high-risk and their
							acquisition could result in the loss of the deposited funds in
							full. Before making transactions with the proposed digital
							financial assets, you should be familiar with the risks associated
							with their acquisition.
						</div>
						<div class="page__list_item" data-number="4.1">
							By concluding this Agreement, the Investor is notified of the
							property risks associated with early withdrawal of digital assets.
						</div>
						<div class="page__list_item" data-number="4.2">
							The Manager or Investor will not be held liable for
							non-performance or improper performance of obligations under the
							Agreement, if this is a consequence of force majeure circumstances
							(force major) specified in this Agreement (force majeure
							circumstances), or as a result of non-performance or improper
							performance of obligations under the Agreement by the other Party.
						</div>
						<div class="page__list_item" data-number="4.3">
							The Investor assures the Manager that he assumes all risks beyond
							the control of the Manager, associated with insurmountable
							circumstances (force majeure) that do not depend on the actions of
							the Manager and which the Manager cannot influence in any way.
						</div>
						<div class="page__list_item" data-number="4.4">
							The investor confirms that he has basic knowledge of digital
							assets and their possible types of trading on the market. The
							Investor confirms that he transfers digital assets to management
							with the knowledge that the Manager will make speculative
							transactions in the digital asset market in order to generate
							profit for the Investor.
						</div>
						<div class="page__list_item" data-number="4.5">
							In the case of the introduction of the relevant requirements for
							the regulation of cryptocurrencies in the country, the resident of
							which is an Investor, he must pass all the requirements necessary
							for the country to be able to continue working with the Manager.
						</div>
						<div class="page__list_item" data-number="4.6">
							All transfers of digital assets from the Investor's wallet take
							place in stablecoins solely for accurate calculation in tariffs at
							the exchange rate on the online exchange
							<a
								href="https://www.binance.com"
								rel="noopener noreferrer"
								target="_blank"
								>https://www.binance.com</a
							>
							at the time of receipt of funds on the smart the contract.
						</div>
						<div class="page__list_item" data-number="5">CONFIDENTIALITY</div>
						<div class="page__list_item" data-number="5.1">
							None of the Parties to the Agreement shall have the right, except
							at the request of the competent authority or court, within period
							of validity and after the termination of the Agreement within 3
							(Three) years, disclose to any person not authorized by one of the
							Parties, information related to the Agreement, with the exception
							of information that can be obtained from publicly available
							sources.
						</div>
						<div class="page__list_item" data-number="5.2">
							The Investor gives his consent to the provision of his personal
							data to the specified persons of the Manager and notified of his
							right to revoke his consent to the processing of personal data at
							any time.
						</div>
						<div class="page__list_item" data-number="6">
							DISPUTE RESOLUTION PROCEDURE
						</div>
						<div class="page__list_item" data-number="6.1">
							Disputes and disagreements that may arise during the execution of
							this Agreement will, if possible, be resolved through negotiations
							between the Parties.
						</div>
						<div class="page__list_item" data-number="7">ADDITIONAL TERMS</div>
						<div class="page__list_item" data-number="7.1">
							The parties acknowledge the validity of this Agreement
						</div>
						<div class="page__list_item" data-number="7.2">
							By completing this agreement, the investor agrees to the
							processing of his personal data by the Manager.
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="terms__acception">
			<div
				class="terms__cancel"
				@click="$store.commit('toggleTermsModal', false)"
			>
				{{ $t('Отменить, не согласен') }}
			</div>
			<button
				class="button terms__accept custom-button is-primary is-size-5 has-text-weight-bold"
				@click="accept"
			>
				{{ $t('Принять') }}
			</button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters(['user']),
	},
	methods: {
		accept() {
			this.$emit('accepted', true)
			this.$store.commit('toggleTermsModal', false)
		},
	},
}
</script>

<style lang="scss" scoped>
.terms {
	font-weight: 300;
	font-size: 14px;
	line-height: 19px;
	color: #666666;

	&__acception {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 27px;
		padding-top: 10px;
	}

	&__cancel {
		font-weight: 300;
		font-size: 14px;
		line-height: 19px;
		color: #30a1ff;
		border-bottom: 1px dashed;
		cursor: pointer;
	}

	&__accept {
		width: 100%;
		max-width: 400px;
	}

	&__title {
		font-weight: normal;
		font-size: 24px;
		line-height: 120%;
		color: #000000;
	}

	&__date {
		margin-top: 1px;
		margin-bottom: 15px;
	}

	p {
		margin-bottom: 20px !important;
	}
}
</style>
