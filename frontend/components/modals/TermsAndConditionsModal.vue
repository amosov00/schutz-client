<template>
	<div class="s-modal">
		<div class="s-modal__scroll">
			<div class="s-modal____content terms" v-if="$i18n.locale == 'ru'">
				<div class="terms__title">Условия и положения</div>
				<div class="terms__date">«8» декабря 2020 г.</div>
				<div class="terms__body">
					<p>
						SCHUTZ именуемый в дальнейшем «Управляющий», с одной стороны, и
						пользователь математического кода «
						{{ user.ethereum_wallet }} », именуемый в дальнейшем «Инвестор», с
						другой стороны, совместно именуемые в дальнейшем «Стороны»,
						заключили настоящее Соглашение о нижеследующем:
					</p>

					<div class="page__list">
						<div class="page__list_item" data-number="1">
							ПРЕДМЕТ СОГЛАШЕНИЯ
						</div>
						<div class="page__list_item" data-number="1.1">
							Управляющий обязуется принять в управление цифровые активы и
							управлять ими в течение срока действия настоящего вклада.
						</div>
						<div class="page__list_item" data-number="1.2">
							Технологией по приему и выдачи цифровых активов выступает
							централизованный смарт-контракт на базе блокчейна Эфириума
							(Ethereum) Schutz. Данный смарт-контракт не влияет на получение
							прибыли Управляющим, а лишь является автоматизированной платформой
							- электронным бухгалтером SCHUTZ.
						</div>
						<div class="page__list_item" data-number="1.3">
							Управляющий обязуется управлять цифровыми спекулятивные операции
							на биржевом рынке в целях Инвестора прибыли от колебаний курсов в
							течение Управляющий имеет право на свое усмотрение выбирать сделки
							для извлечения прибыли в пользу Инвестора.
						</div>
						<div class="page__list_item" data-number="1.4">
							Расчетный период определяется условиями тарифного плана.
						</div>
						<div class="page__list_item" data-number="1.5">
							Заключение Соглашения между Управляющим и Инвестором, вместе
							именуемыми – «Стороны», осуществляется путем полного и
							безоговорочного присоединения Клиента к Соглашению (акцепта
							Соглашения) в соответствии со ст. 428 Гражданского кодекса
							Российской Федерации.
						</div>
						<div class="page__list_item" data-number="1.6">
							В рамках настоящего Соглашения допускается внесение цифровых
							токенов на криптовалютный кошелек Управляющего. Возврат объектов
							управления или процентов по ним осуществляются в цифровых токенах.
							Передача цифровых активов в доверительное управление не влечет
							перехода права собственности на них к Управляющему.
						</div>
						<div class="page__list_item" data-number="1.7">
							Передача в доверительное управление цифровых активов
							осуществляется Инвестором путем перечисления цифровых активов на
							кошелек Управляющего. Днем передачи цифровых активов Инвестора в
							доверительное управление считается день их поступления на кошелек
							Управляющего.
						</div>
						<div class="page__list_item" data-number="1.8">
							Перечисления начисленных процентов на суммы переданных в
							управление средств («тела депозита») происходят за каждый квартал
							(первый квартал 15-20 апреля, второй квартал 15-20 июля, третий
							квартал 15-20 октября, четвертый квартал 15-20 января), за
							исключением выходных и праздничных дней.
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
							Использовать переданные Инвестором в управление средства
							исключительно в целях извлечения в пользу Инвестора спекулятивной
							прибыли, управляя средствами путем совершения сделок купли-продажи
							на биржевом рынке с целевой доходностью согласно условиям
							тарифного плана. Действовать добросовестно и тем способом, который
							является наилучшим для интересов Инвестора.
						</div>
						<div class="page__list_item" data-number="2.1.2">
							В случае наступления форс-мажорных обстоятельств Управляющий
							вправе менять (повышать или снижать) процент прибыли, заявленный
							согласно тарифному плану, уведомив другую Сторону в срок не менее,
							чем за 30 календарных дней.
						</div>
						<div class="page__list_item" data-number="2.1.3">
							Управляющий вправе изменять данное «Соглашение», а также
							«Ограничение отвественности» без обязательства уведомления клиента
							о внесенных изменениях в вышеупомянутые документы.
						</div>
						<div class="page__list_item" data-number="2.1.4">
							Управляющий обязуется уведомлять клиента о начислении
							ежеквартальных дивидендов, завершении работы тела депозита
							посредством e-mail уведомления.
						</div>

						<div class="page__list_item" data-number="2.2">
							Права и обязанности Инвестора:
						</div>
						<div class="page__list_item" data-number="2.2.1">
							Инвестор обязан принять условия тарифного плана, описанные в
							данном «Соглашении», а также
							<a
								href="/files/Ogranicheniye_otvetstvennosti.pdf"
								target="_blank"
								rel="noopener noreferrer"
							>
								«Ограничение ответственности»</a
							>.
						</div>
						<div class="page__list_item" data-number="2.2.2">
							Инвестор не в праве вмешиваться в деятельность управляющего по
							Доверительному управлению активами.
						</div>
						<div class="page__list_item" data-number="2.2.3">
							Инвестор обязуется зафиксировать полученную прибыль путем вывода
							или реинвестирования всего объема средств в период не позднее чем
							3 календарных года с даты открытого депозита. В противном случае
							итоговый баланс (итоговая сумма депозита и ежеквартальных выплат)
							будет списан со счета Инвестора в пользу Компании.
						</div>
						<div class="page__list_item" data-number="2.2.4">
							По истечению срока работы вклада Инвестор обязуется подать заявку
							на вывод/пролонгацию тела депозита посредством нажатия на кнопку
							«Вывести/пролонгировать мой депозит» заблаговременно, до конца
							месяца, после которого планируется вывод/пролонгация. В противном
							случае администрация проекта перенесет вывод/пролонгацию тела
							депозита Инвестора на 1 месяц позднее предусмотренного тарифным
							планом. <br />
							Пример: вывод тела депозита по тарифному плану назначен на 20-22
							февраля 2021 г., Инвестору необходимо подать заявку на
							вывод/пролонгацию до конца января 2021. Если Инвестор просрочил
							подачу заявку
						</div>
						<div class="page__list_item" data-number="2.2.5">
							Инвестор имеет право пополнять депозит, а также реинвестировать
							полученные ежеквартальные проценты на протяжении всего срока
							работы депозита (12 мес). В этом случае изначальная сумма депозита
							будет пополнена на сумму пополнения и/или реинвестированных
							средств. При этом сумма выплат по следующим отчетным периодам
							(кварталам) увеличится соответственно. Вывод итоговой суммы
							депозита будет произведен по первоначальной дате открытия
							депозита.
						</div>
						<div class="page__list_item" data-number="2.2.6">
							<strong> Изменение платежных реквизитов получателя. </strong>В
							случае потери Инвестором доступа к кошельку (математическому
							коду), который привязан к личному кабинету и с которого был открыт
							депозит, Инвестору необходимо уведомить службу поддержки SCHUTZ
							через e-mail обращение. Управляющий предложит Инвестору процедуру
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
							плана и действует до момента его расторжения.
						</div>
						<div class="page__list_item" data-number="3.2">
							Расторжение настоящего Соглашения возможно только по окончании
							срока действия депозита. Каждая из Сторон настоящего Соглашения
							вправе в одностороннем порядке расторгнуть настоящее Соглашение,
							предупредив об этом другую Сторону не менее, чем за 5 (пять)
							рабочих дней до завершения очередного расчетного периода
							посредством e-mail уведомления.
						</div>
						<div class="page__list_item" data-number="3.3">
							По заявлению любой из Сторон настоящее Соглашение может быть
							расторгнуто в одностороннем порядке в случае наступления
							<a
								href="/files/Ogranicheniye_otvetstvennosti.pdf"
								target="_blank"
								rel="noopener noreferrer"
								>обстоятельств непреодолимой силы (форс-мажор), повлиявших на
								возможность исполнения настоящего Соглашения.</a
							>. При этом, Сторона, ссылающаяся на обстоятельства непреодолимой
							силы в качестве основания для расторжения настоящего Соглашения,
							должна представить другой Стороне полученные из компетентных
							органов доказательства наступления обстоятельств непреодолимой
							силы и степень их влияния на невозможность исполнения настоящего
							Соглашения, например, <br />
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
								target="_blank"
								rel="noopener noreferrer"
								>https://poloniex.com</a
							>
							<a
								href="https://www.binance.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://www.binance.com</a
							>
							<a
								href="https://bitmex.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://bitmex.com</a
							>
							<a
								href="https://bitfinex.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://bitfinex.com</a
							>
							<a
								href="https://bittrex.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://bittrex.com</a
							>
							<a
								href="https://hitbtc.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://hitbtc.com</a
							>
							<a
								href="https://www.okex.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://www.okex.com</a
							>
							<a
								href="https://www.hbg.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://www.hbg.com</a
							>
							<a
								href="https://lykke.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://lykke.com</a
							>
							причитающихся платежей, осуществление несвоевременных выплат или
							иные действия, не поддающиеся контролю со стороны Управляющего.
							<br />
							- Атака мошенниками на аккаунты управляющего и хищение ими
							средств. (Полный список пунктов содержит документ
							<a href="/files/Ogranicheniye_otvetstvennosti.pdf" target="_blank"
								>«Ограничение отвественности»</a
							>
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
							Управляющий или Инвестор не будет нести ответственность за
							неисполнение или ненадлежащее исполнение обязательств по Договору,
							если это будет являться следствием обстоятельств непреодолимой
							силы (форс-мажор), указанных в данном Договоре (Форс-мажорные
							обстоятельства), или следствием неисполнения или ненадлежащего
							исполнения обязательств по Договору другой Стороной.
						</div>
						<div class="page__list_item" data-number="4.3">
							Инвестор заверяет Управляющего в том, что принимает на себя все
							независящие от воли Управляющего риски, связанные с непреодолимыми
							обстоятельствами (форс-мажор), которые не зависят от действия
							Управляющего и на которые Управляющий не может повлиять каким-либо
							образом.
						</div>
						<div class="page__list_item" data-number="4.4">
							Инвестор подтверждает, что имеет базовые знания о цифровых активах
							и возможных видах их торговле на рынке. Инвестор подтверждает, что
							передает цифровые активы в доверительное управление с осознанием
							того, что Управляющий будет совершать спекулятивные сделки на
							рынке цифровых активов с целью извлечения прибыли для Инвестора.
						</div>
						<div class="page__list_item" data-number="4.5">
							В случае введения соответствующих требований по регулированию
							криптовалют в стране, резидентом которой является инвестор, он
							должен пройти все необходимые страной требования, чтобы иметь
							возможность продолжить работу с управляющим.
						</div>
						<div class="page__list_item" data-number="4.6">
							Все переводы цифровых активов с кошелька Инвестора конвертируются
							в стейблкоины исключительно для точного расчета в тарифах по курсу
							на онлайн- бирже
							<a
								href="https://poloniex.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://poloniex.com</a
							>
							на момент поступления средств на кошелек Управляющего.
						</div>
						<div class="page__list_item" data-number="5">
							КОНФИДЕНЦИАЛЬНОСТЬ:
						</div>
						<div class="page__list_item" data-number="5.1">
							Ни одна из Сторон Договора не имеет права, кроме как по требованию
							компетентного органа или суда, в течение срока действия и после
							прекращения действия Договора в течение 3 (Трех) лет, разглашать
							какому-либо лицу, не уполномоченному одной из Сторон, информацию,
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
							Стороны признают юридическую силу настоящего Соглашения
						</div>
						<div class="page__list_item" data-number="7.2">
							Заполняя настоящее соглашение инвестор соглашается с обработкой
							своих персональных данных управляющим.
						</div>
					</div>
				</div>
			</div>

			<div class="s-modal____content terms" v-else>
				<div class="terms__title">Terms and Conditions</div>
				<div class="terms__date">08 December 2020</div>
				<div class="terms__body">
					<p>
						SCHUTZ, hereinafter referred to as the "Manager", on the one hand,
						and the user of the mathematical code "....", hereinafter referred
						to as the "Investor", on the other hand, collectively hereinafter
						referred to as the "Parties", have entered into this Agreement as
						follows:
					</p>

					<div class="page__list">
						<div class="page__list_item" data-number="1">
							SUBJECT OF THE AGREEMENT
						</div>
						<div class="page__list_item" data-number="1.1">
							The manager undertakes to accept and manage digital assets during
							the term of this investment.
						</div>
						<div class="page__list_item" data-number="1.2">
							The technology for receiving and issuing digital assets is a
							centralized smart contract based on the Ethereum Schutz
							blockchain. This smart contract does not affect the receipt of
							profit by the Manager, but is only an automated platform - the
							SCHUTZ electronic accountant.
						</div>
						<div class="page__list_item" data-number="1.3">
							The Manager undertakes to manage digital assets by performing
							speculative transactions on the exchange market in order to
							receive profit for the Investor from exchange rate fluctuations
							during the settlement period. The Manager has the right, at his
							own discretion, to choose any speculative transactions to make a
							profit in favor of the Investor.
						</div>
						<div class="page__list_item" data-number="1.4">
							The billing period is determined by the terms of the tariff plan.
						</div>
						<div class="page__list_item" data-number="1.5">
							The conclusion of the Agreement between the Manager and the
							Investor, collectively referred to as the "Parties", is carried
							out by the complete and unconditional accession of the Client to
							the Agreement (acceptance of the Agreement) in accordance with
							Art. 428 of the Civil Code of the Russian Federation
						</div>
						<div class="page__list_item" data-number="1.6">
							Within the framework of this Agreement, it is allowed to deposit
							digital tokens to the Manager's cryptocurrency wallet. The return
							of management objects or interest on them is carried out in
							digital tokens. The transfer of digital assets into trust does not
							entail the transfer of ownership of them to the Manager.
						</div>
						<div class="page__list_item" data-number="1.7">
							The transfer of digital assets into trust is carried out by the
							Investor by transferring digital assets to the Manager's wallet.
							The day of transfer of the Investor's digital assets into trust is
							the day they are received on the Manager's wallet.
						</div>
						<div class="page__list_item" data-number="1.8">
							The transfer of accrued interest on the amounts transferred to
							management of funds ("the body of the deposit") occurs for each
							quarter (first quarter April 15-20, second quarter July 15-20,
							third quarter October 15-20, fourth quarter January 15-20), for
							excluding weekends and holidays.
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
							for the purpose of deriving speculative profits for the Investor,
							managing funds by performing purchase and sale transactions on the
							exchange market with target profitability in accordance with the
							terms of the tariff plan. Act in good faith and in a manner that
							is in the best interests of the Investor.
						</div>
						<div class="page__list_item" data-number="2.1.2">
							In the event of force majeure circumstances, the Manager has the
							right to change (increase or decrease) the percentage of profit
							declared according to the tariff plan, notifying the other Party
							at least 30 calendar days in advance.
						</div>
						<div class="page__list_item" data-number="2.1.3">
							The manager has the right to change this "Agreement", as well as
							the "Limitation of Liability" without the obligation to notify the
							client about the changes made to the above documents.
						</div>
						<div class="page__list_item" data-number="2.1.4">
							The manager undertakes to notify the client about the accrual of
							quarterly dividends, the completion of the deposit body via e-mail
							notification.
						</div>
						<div class="page__list_item" data-number="2.2">
							Investor's rights and obligations:
						</div>
						<div class="page__list_item" data-number="2.2.1">
							The investor is obliged to accept the terms of the tariff plan
							described in this "Agreement", as well as the .
							<a
								href="/files/Limitation_of_liability.pdf"
								target="_blank"
								rel="noopener noreferrer"
							>
								"Limitation of Liability"</a
							>.
						</div>
						<div class="page__list_item" data-number="2.2.2">
							The investor has no right to interfere with the activities of the
							Asset Trust Manager
						</div>
						<div class="page__list_item" data-number="2.2.3">
							The investor undertakes to fix the received profit by withdrawing
							or reinvesting the entire amount of funds within a period not
							later than 3 calendar years from the date of the open deposit.
							Otherwise, the final balance (the total amount of the deposit and
							quarterly payments) will be debited from the Investor's account in
							favor of the Company.
						</div>
						<div class="page__list_item" data-number="2.2.4">
							Upon the expiration of the term of the deposit, the Investor
							undertakes to submit an application for withdrawal / prolongation
							of the body of the deposit by clicking on the "Withdraw / prolong
							my deposit" button in advance, by the end of the month after which
							withdrawal / prolongation is planned. Otherwise, the project
							administration will postpone the withdrawal / prolongation of the
							Investor's deposit body 1 month later than provided for by the
							tariff plan. <br />
							Example: the withdrawal of the body of the deposit according to
							the tariff plan is scheduled for February 20-22, 2021, the
							Investor must submit an application for withdrawal / prolongation
							by the end of January 2021. If the Investor is late in submitting
							the application
						</div>
						<div class="page__list_item" data-number="2.2.5">
							The investor has the right to replenish the deposit, as well as
							reinvest the received quarterly interest throughout the entire
							term of the deposit (12 months). In this case, the initial amount
							of the deposit will be replenished by the amount of the
							replenishment and / or reinvested funds. At the same time, the
							amount of payments for the next reporting periods (quarters) will
							increase accordingly. The withdrawal of the total amount of the
							deposit will be made according to the initial date of opening the
							deposit.
						</div>
						<div class="page__list_item" data-number="2.2.6">
							Change of payment details of the recipient. If the Investor loses
							access to the wallet (mathematical code), which is tied to the
							personal account and from which the deposit was opened, the
							Investor must notify the SCHUTZ support service via e-mail. The
							Manager will offer the Investor a procedure for restoring access
							to the deposit.
						</div>

						<div class="page__list_item" data-number="2.2.7">
							The Investor is responsible for the payment of all tax liabilities
							(personal income tax), the Investor is obliged to fulfill
							(calculate and pay) all payments independently. The Investor bears
							responsibility for non-fulfillment (improper fulfillment) of tax
							obligations independently.
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
							wallet within 1 (one) calendar day from the date of signing this
							Agreement. This Agreement enters into force from the moment of
							completion of the transaction in accordance with the terms of the
							tariff plan and is valid until its termination.
						</div>
						<div class="page__list_item" data-number="3.2">
							Termination of this Agreement is possible only at the end of the
							term of the deposit. Each of the Parties to this Agreement has the
							right to unilaterally terminate this Agreement by notifying the
							other Party about it at least 5 (five) business days before the
							end of the next billing period by e-mail notification.
						</div>
						<div class="page__list_item" data-number="3.3">
							At the request of any of the Parties, this Agreement may be
							terminated unilaterally in the event of force majeure
							circumstances (force majeure) that affect the ability to execute
							this Agreement (link to the document
							<a
								href="/files/Limitation_of_liability.pdf"
								target="_blank"
								rel="noopener noreferrer"
								>"Limitation of Liability"</a
							>
							). At the same time, the Party referring to force majeure
							circumstances as a basis for terminating this Agreement must
							provide the other Party with evidence obtained from the competent
							authorities of the occurrence of force majeure circumstances and
							the degree of their influence on the impossibility of executing
							this Agreement, for example, <br />

							- the issuance of normative acts, the provisions of which
							stipulate the impossibility of the proper fulfillment of
							obligations; <br />
							- occurrence of natural disasters, including floods, earthquakes,
							fires, etc.; <br />
							- the influence of socio-political factors, including strikes,
							rallies, marches, actions of the authorities, military actions or
							conflicts, terrorist acts; <br />
							- termination (suspension) of the activities of auction
							organizers; <br />
							- non-payment by online exchanges <br />

							<a
								href="https://poloniex.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://poloniex.com</a
							>
							<a
								href="https://www.binance.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://www.binance.com</a
							>
							<a
								href="https://bitmex.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://bitmex.com</a
							>
							<a
								href="https://bitfinex.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://bitfinex.com</a
							>
							<a
								href="https://bittrex.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://bittrex.com</a
							>
							<a
								href="https://hitbtc.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://hitbtc.com</a
							>
							<a
								href="https://www.okex.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://www.okex.com</a
							>
							<a
								href="https://www.hbg.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://www.hbg.com</a
							>
							<a
								href="https://lykke.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://lykke.com</a
							>
							of due payments, making late payments or other actions beyond the
							control of the Manager.
							<br />
							- Attack by fraudsters on manager accounts and theft of funds.
							(The complete list of items contains the document
							<a href="/files/Limitation_of_liability.pdf" target="_blank"
								>"Disclaimer"</a
							>
							)
						</div>
						<div class="page__list_item" data-number="3.4">
							This Agreement can also be terminated by mutual agreement of the
							Parties.
						</div>
						<div class="page__list_item" data-number="4">
							LIABILITY OF THE PARTIES
						</div>

						<div class="page__list_item" data-number="">
							The offered digital financial assets are high-risk, and their
							acquisition may result in the loss of the deposited funds in full.
							Before transacting with proposed digital financial assets, you
							should be familiar with the risks involved in acquiring them.
						</div>
						<div class="page__list_item" data-number="4.1">
							By entering into this Agreement, the Investor is notified of the
							property risks associated with the early withdrawal of digital
							assets.
						</div>
						<div class="page__list_item" data-number="4.2">
							The Manager or Investor will not be liable for non-fulfillment or
							improper fulfillment of obligations under the Agreement if this is
							the result of force majeure circumstances (force majeure)
							specified in this Agreement (Force Majeure circumstances), or as a
							result of nonfulfillment or improper fulfillment of obligations
							under the Agreement by the other Party.
						</div>
						<div class="page__list_item" data-number="4.3">
							The Investor assures the Manager that he assumes all risks beyond
							the control of the Manager related to insurmountable circumstances
							(force majeure) that do not depend on the actions of the Manager
							and which the Manager cannot influence in any way.
						</div>
						<div class="page__list_item" data-number="4.4">
							The investor confirms that he has basic knowledge of digital
							assets and their possible types of trading on the market. The
							Investor confirms that he transfers digital assets into trust with
							the knowledge that the Manager will make speculative transactions
							in the digital asset market in order to generate profit for the
							Investor.
						</div>
						<div class="page__list_item" data-number="4.5">
							If the relevant requirements for the regulation of
							cryptocurrencies are introduced in the country of which the
							investor is a resident, he must pass all the requirements
							necessary by the country in order to be able to continue working
							with the manager.
						</div>
						<div class="page__list_item" data-number="4.6">
							All transfers of digital assets from the Investor's wallet are
							converted into stablecoins solely for accurate calculation in
							tariffs at the exchange rate on the online exchange
							<a
								href="https://poloniex.com"
								target="_blank"
								rel="noopener noreferrer"
								>https://poloniex.com</a
							>
							at the time the funds are received on the Manager's wallet.
						</div>
						<div class="page__list_item" data-number="5">
							CONFIDENTIALITY
						</div>
						<div class="page__list_item" data-number="5.1">
							None of the Parties to the Agreement shall have the right, except
							at the request of the competent authority or the court, during the
							term and after the termination of the Agreement within 3 (Three)
							years, to disclose to any person not authorized by one of the
							Parties, information related to the Agreement, with the exception
							of information that can be obtained from publicly available
							sources.
						</div>
						<div class="page__list_item" data-number="5.2">
							The Investor gives his consent to the provision of his personal
							data to the specified persons of the Manager and is notified of
							his right to withdraw his consent to the processing of personal
							data at any time.
						</div>
						<div class="page__list_item" data-number="6">
							DISPUTE RESOLUTION PROCEDURE
						</div>
						<div class="page__list_item" data-number="6.1">
							Disputes and disagreements that may arise during the execution of
							this Agreement will, if possible, be resolved through negotiations
							between the Parties.
						</div>
						<div class="page__list_item" data-number="7">
							ADDITIONAL TERMS
						</div>
						<div class="page__list_item" data-number="7.1">
							The parties acknowledge the validity of this Agreement
						</div>
						<div class="page__list_item" data-number="7.2">
							By completing this agreement, the investor agrees to the
							processing of his personal data by the manager.
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
				{{ $t("Отменить, не согласен") }}
			</div>
			<button
				@click="accept()"
				class="button terms__accept custom-button is-primary is-size-5 has-text-weight-bold"
			>
				{{ $t("Принять") }}
			</button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	methods: {
		accept() {
			this.$emit("accepted", true);
			this.$store.commit("toggleTermsModal", false);
		}
	},
	computed: {
		...mapGetters(["user"])
	}
};
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
